import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FitnessProgramService } from '../../services/fitnessProgram/fitness-program.service';
import { SnackBarService } from '../../services/snackbar/snack-bar.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from '../../services/image/image.service';

@Component({
  selector: 'app-fitness-program',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, MatTooltipModule],
  templateUrl: './fitness-program.component.html',
  styleUrl: './fitness-program.component.css'
})
export class FitnessProgramComponent {
  commentForm: FormGroup;
  id?: number;
  embedUrl: string = "https://www.youtube.com/embed/";

  grade = new FormControl(null, [Validators.required, Validators.pattern('[1-5]{1}')]);
  comment = new FormControl(null, [Validators.required]);

  fitnessProgram: any;

  ytUrl: any = '';
  programImageUrl: any = '../../../assets/defaultFitnes.jpg';

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private programsService: FitnessProgramService,
    private snackBarService: SnackBarService, private sanitizer: DomSanitizer,private imageService: ImageService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.programsService.getFitnessProgram(this.id).subscribe({
          next: (data) => {

              this.ytUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.embedUrl + data.link);
              let image = imageService.downloadImage(data.imageId);
              if(image)
                this.programImageUrl = image; 
              this.fitnessProgram = data;
          },
          error: (err) => {
            this.snackBarService.openSnackBar("Error during communication with server!","Close",false);
          }
        })
      }
    })

    this.commentForm = formBuilder.group({
      grade: this.grade,
      comment: this.comment
    })
  };
}
