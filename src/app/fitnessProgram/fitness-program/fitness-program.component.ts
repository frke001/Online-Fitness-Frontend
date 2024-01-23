import { Component, inject } from '@angular/core';
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
import { AuthService } from '../../services/auth/auth.service';
import { ClientService } from '../../services/client/client.service';

@Component({
  selector: 'app-fitness-program',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, MatTooltipModule],
  templateUrl: './fitness-program.component.html',
  styleUrl: './fitness-program.component.css'
})
export class FitnessProgramComponent {


  commentForm: FormGroup;
  participateForm: FormGroup;
  id?: number;
  embedUrl: string = "https://www.youtube.com/embed/";

  question = new FormControl(null, [Validators.required]);
  paymentType = new FormControl(null, [Validators.required]);
  cardNumber = new FormControl(null, []);
  mail = new FormControl(null, []);
  fitnessProgram: any;
  isParticipating: any;
  defaultUserImage: any = '../../../assets/profileImage.png';
  ytUrl: any = '';
  programImageUrl: any = '../../../assets/defaultFitnes.jpg';
  questions: Array<any> = [];
  questionForm: FormGroup;
  advisorQuestion = new FormControl(null, [Validators.required]);

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private programsService: FitnessProgramService,
    private snackBarService: SnackBarService, private sanitizer: DomSanitizer, private imageService: ImageService, private authService: AuthService,
    private clientService: ClientService) {
     
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.programsService.getFitnessProgram(this.id).subscribe({
          next: (data) => {

            this.ytUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.embedUrl + data.link);
           
            if (data.imageId){
              let image = imageService.downloadImage(data.imageId);
              this.programImageUrl = image;
            }
              
            this.fitnessProgram = data;
            this.questions = data.questions;
            if (this.isLoggedIn()) {
              this.clientService.isParticipating(this.id).subscribe({
                next: (data) => {
                  this.isParticipating = data;
                },
                error: (err) => {
                  this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
                }
              })
            }
          },
          error: (err) => {
            this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
          }
        })
      }
    })
    
    this.commentForm = formBuilder.group({
      question: this.question
    })
    this.participateForm = formBuilder.group({
      paymentType: this.paymentType
    });
    this.questionForm = formBuilder.group({
      advisorQuestion: this.advisorQuestion
    })
  };

  sendQuestionAdvisor() {
    
    if (this.id != null) {
      this.clientService.askAdvisor({
        question: this.advisorQuestion.value,
        fitnessProgramId: this.id
      }).subscribe({
        next: (data) => {
          this.snackBarService.openSnackBar("Question successfully sent!", "Close", true);
          this.questionForm.reset();
        },
        error: (err) => {
          this.snackBarService.openSnackBar("Question unsuccessfully sent!", "Close", false);
          this.questionForm.reset();
        }
      });
    }
  }
  getId(){ 
    return this.authService.getId();
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  getBackUrl() {
    //history.back();
    //return this.isLoggedIn() ? '/my-fitness-programs' : '/fitness-programs';
  }

  sendQuestion() {
    if(this.fitnessProgram){
      this.programsService.askQuestion(this.fitnessProgram?.id, {
        clientSenderId: this.getId(),
        question: this.question.value
      }).subscribe({
        next: (data)=>{
          this.snackBarService.openSnackBar("Successfully send!","Close",true);
          this.questions.push(data);
          this.commentForm.reset();
        },
        error: (err)=>{
          this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
          this.commentForm.reset();
        }
      })
    }
    
  }

  getUserImage(id: any): string {
    if(id){
      let image = this.imageService.downloadImage(id);
      return image
    }else{
      return this.defaultUserImage;
    }
  }
  getImage(id: any): string {
    if(id){
      let image = this.imageService.downloadImage(id);
      return image;
    }else{
      return this.programImageUrl;
    }
  }
  // getUserImage(id: any): string {
  //   let image = this.imageService.downloadImage(id);
  //   return image ? image : this.defaultUserImage;
  // }


}
