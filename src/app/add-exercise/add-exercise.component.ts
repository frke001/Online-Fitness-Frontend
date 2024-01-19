import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ClientService } from '../services/client/client.service';
import { SnackBarService } from '../services/snackbar/snack-bar.service';


@Component({
  selector: 'app-add-exercise',
  standalone: true,
  imports: [RouterLink,MatButtonModule, ReactiveFormsModule,MatIconModule, FormsModule,MatFormFieldModule, MatInputModule, MatDatepickerModule,MatNativeDateModule],
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.css'
})
export class AddExerciseComponent {


  addForm:FormGroup;
  exercise = new FormControl(null, [Validators.required]);
  date = new FormControl(new Date(), [Validators.required]);
  sets = new FormControl(null, [Validators.required, Validators.max(100), Validators.min(0)]);
  reps = new FormControl(null, [Validators.required, Validators.max(100), Validators.min(0)]);
  weight = new FormControl(null, [Validators.required, Validators.max(500), Validators.min(0)]);
  constructor(private formBuilder:FormBuilder, private clientService: ClientService,
    private snackBarService: SnackBarService){
    this.addForm = this.formBuilder.group({
      exercise: this.exercise,
      date: this.date,
      sets:this.sets,
      reps: this.reps,
      weight: this.weight
    })
  }

  onSave() {
    let request = {
      exercise: this.exercise.value,
      sets: this.sets.value,
      reps: this.reps.value,
      weight: this.weight.value,
      date: new Date(this.date.value? this.date.value : '')
    }
    console.log(request);
    
    this.clientService.insertExercise(request).subscribe({
      next:(data)=>{
        this.snackBarService.openSnackBar("Exercise successfully added!","Close", true);
        this.addForm.reset();
      },
      error: (err)=>{
        this.snackBarService.openSnackBar("Error during communication with server!","Close", false);
        this.addForm.reset();
      }
    });
  }
}
