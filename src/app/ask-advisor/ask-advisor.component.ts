import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FitnessProgramService } from '../services/fitnessProgram/fitness-program.service';
import { SnackBarService } from '../services/snackbar/snack-bar.service';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from '../services/client/client.service';

@Component({
  selector: 'app-ask-advisor',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './ask-advisor.component.html',
  styleUrl: './ask-advisor.component.css'
})
export class AskAdvisorComponent {


  questionForm: FormGroup;
  programs: Array<any> = []
  question = new FormControl(null, [Validators.required]);
  programId?: number;
  constructor(private programService: FitnessProgramService, private snackBarService: SnackBarService,
    private formBuilder: FormBuilder, private clientService: ClientService) {
    this.programService.getAll().subscribe({
      next: (data) => {
        this.programs = data;
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
      }
    });
    this.questionForm = formBuilder.group({
      question: this.question
    })
  }
  onAsk(programId: any) {
    console.log(programId);
    this.programId = programId;
    
  }
  sendQuestion() {
    console.log(this.programId);
    
    if (this.programId != null) {
      this.clientService.askAdvisor({
        question: this.question.value,
        fitnessProgramId: this.programId
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
}
