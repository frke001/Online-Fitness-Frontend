import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClientService } from '../../services/client/client.service';
import { SnackBarService } from '../../services/snackbar/snack-bar.service';
import { ImageService } from '../../services/image/image.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-finished',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './finished.component.html',
  styleUrl: './finished.component.css'
})
export class FinishedComponent {

  programsFinished: Array<any> = [];
    defaultImage: string = '../../../assets/defaultFitnes.jpeg'
    constructor(private clientService: ClientService, private snackBarService: SnackBarService,
      private imageService:ImageService){
        this.clientService.getAllFitnessProgramsFinished().subscribe({
            next: (data)=>{
                this.programsFinished = data;
            },
            error: (err)=>{
                this.snackBarService.openSnackBar("Error during communication with server!","Close",false);
            }
        })
    }
    getImage(id: any): string {
      if(id){
        let image = this.imageService.downloadImage(id);
        return image
      }else{
        return this.defaultImage;
      }
    }
}
