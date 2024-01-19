import { Component } from '@angular/core';
import { ClientService } from '../services/client/client.service';
import { DatePipe } from '@angular/common';
import { SnackBarService } from '../services/snackbar/snack-bar.service';
import { MatButtonModule } from '@angular/material/button';
import { FormArrayName, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-activity-diary',
  standalone: true,
  imports: [MatTooltipModule, RouterLink, MatButtonModule, ReactiveFormsModule,MatIconModule, FormsModule,MatFormFieldModule, MatInputModule, MatDatepickerModule,MatNativeDateModule],
  templateUrl: './activity-diary.component.html',
  styleUrl: './activity-diary.component.css'
})
export class ActivityDiaryComponent {


  exercises: Array<any> = [];
  addForm:FormGroup;
  exercise = new FormControl(null, [Validators.required]);
  date = new FormControl(null, [Validators.required]);
  sets = new FormControl(null, [Validators.required, Validators.max(100), Validators.min(0)]);
  reps = new FormControl(null, [Validators.required, Validators.max(100), Validators.min(0)]);
  weight = new FormControl(null, [Validators.required, Validators.max(500), Validators.min(0)]);

  constructor(private clientService: ClientService, private snackBarService: SnackBarService,
    private formBuilder:FormBuilder){
    this.clientService.getAllExercises().subscribe({
      next:(data)=>{
        this.exercises = data;
        
      },
      error: (err)=>{
        this.snackBarService.openSnackBar("Error during communication with server!","Close", false);
      }
    });
    this.addForm = this.formBuilder.group({
      exercise: this.exercise,
      date: this.date,
      sets:this.sets,
      reps: this.reps,
      weight: this.weight
    })
  }
  onDelete(exerciseId: any) {
    this.clientService.deleteExercise(exerciseId).subscribe({
      next:(data)=>{
        this.snackBarService.openSnackBar("Exercise deleted successfully!","Close", true);
        this.exercises = this.exercises.filter(el => el.id != exerciseId);
      },
      error: (err)=>{
        this.snackBarService.openSnackBar("Exercise deleted unsuccessfully!","Close", false);
      }
    })
  }

}
