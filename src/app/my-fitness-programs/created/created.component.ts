import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ClientService } from '../../services/client/client.service';
import { SnackBarService } from '../../services/snackbar/snack-bar.service';
import { ImageService } from '../../services/image/image.service';

@Component({
  selector: 'app-created',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './created.component.html',
  styleUrl: './created.component.css'
})
export class CreatedComponent {


  fitnessPrograms: Array<any> = [];
  defaultImage: string = '../../../assets/defaultFitnes.jpg'
  constructor(private clientService: ClientService, private snackBarService: SnackBarService, private imageService: ImageService) {
    this.clientService.getAllFitnessPrograms().subscribe({
      next: (data) => {
        this.fitnessPrograms = data;
        this.snackBarService.openSnackBar("Successfully fetched programs!", "Close", true);
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
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

  onDelete(id: any) {

    this.clientService.deleteFitnessProgram(id).subscribe({
      next: (data) => {
        if (data) {
          this.fitnessPrograms = this.fitnessPrograms.filter(program => {
            return program.id !== id;
          })
          this.snackBarService.openSnackBar("Fitness program successfully deleted!", "Close", true);
        } else {
          this.snackBarService.openSnackBar("Fitness program unsuccessfully deleted!", "Close", false);
        }
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
      }
    })

  }
}
