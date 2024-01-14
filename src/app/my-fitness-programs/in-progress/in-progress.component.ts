import { Component } from '@angular/core';
import { ClientService } from '../../services/client/client.service';
import { SnackBarService } from '../../services/snackbar/snack-bar.service';
import { RouterLink } from '@angular/router';
import { ImageService } from '../../services/image/image.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-in-progress',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './in-progress.component.html',
  styleUrl: './in-progress.component.css'
})
export class InProgressComponent {

  programsInProgress: Array<any> = [];
  defaultImage: string = '../../../assets/defaultFitnes.jpeg'
  constructor(private clientService: ClientService, private snackBarService: SnackBarService,
    private imageService: ImageService) {
    this.clientService.getAllFitnessProgramsInProgress().subscribe({
      next: (data) => {
        this.programsInProgress = data;
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
      }
    })
  }
  getImage(id: any): string {
    let image = this.imageService.downloadImage(id);
    return image ? image : this.defaultImage;
  }
}
