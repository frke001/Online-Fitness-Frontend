import { AfterViewInit, Component } from '@angular/core';
import { ClientService } from '../services/client/client.service';
import { DatePipe } from '@angular/common';
import { SnackBarService } from '../services/snackbar/snack-bar.service';
import { MatButtonModule } from '@angular/material/button';
import { FormArrayName, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AreaChartComponent } from '../area-chart/area-chart.component';
import { PdfService } from '../services/pdf/pdf.service';


@Component({
  selector: 'app-activity-diary',
  standalone: true,
  imports: [AreaChartComponent, MatTooltipModule, RouterLink, MatButtonModule, ReactiveFormsModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './activity-diary.component.html',
  styleUrl: './activity-diary.component.css'
})

export class ActivityDiaryComponent{

  exercises: Array<any> = [];
  addForm: FormGroup;
  exercise = new FormControl(null, [Validators.required]);
  date = new FormControl(null, [Validators.required]);
  sets = new FormControl(null, [Validators.required, Validators.max(100), Validators.min(0)]);
  reps = new FormControl(null, [Validators.required, Validators.max(100), Validators.min(0)]);
  weight = new FormControl(null, [Validators.required, Validators.max(500), Validators.min(0)]);

  startDate = new FormControl(null);
  endDate = new FormControl(null);
  campaignOne: FormGroup;

  addEntryForm: FormGroup;
  myWeight = new FormControl(null, [Validators.required, Validators.min(20), Validators.max(500)]);
  myDate = new FormControl(null, [Validators.required]);

  xAxis: Array<any> = [];
  yAxis: Array<any> = [];
  constructor(private clientService: ClientService, private snackBarService: SnackBarService,
    private formBuilder: FormBuilder, private pdfService:PdfService) {

    this.clientService.getAllExercises().subscribe({
      next: (data) => {
        this.exercises = data;

      },
      error: (err) => {
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
      }
    });
    this.addForm = this.formBuilder.group({
      exercise: this.exercise,
      date: this.date,
      sets: this.sets,
      reps: this.reps,
      weight: this.weight
    });
    this.campaignOne = this.formBuilder.group({
      start: this.startDate,
      end: this.endDate
    });
    this.addEntryForm = this.formBuilder.group({
      myWeight: this.myWeight,
      myDate: this.myDate
    })
  }
  onShowProgress() {
    this.clientService.getProgressChartValues({}).subscribe({
      next: (data) => {
        this.xAxis = data.xaxis;
        this.yAxis = data.yaxis;
        this.startDate.setValue(null);
        this.endDate.setValue(null);  
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
      }
    })
  }
 
  onDelete(exerciseId: any) {
    this.clientService.deleteExercise(exerciseId).subscribe({
      next: (data) => {
        this.snackBarService.openSnackBar("Exercise deleted successfully!", "Close", true);
        this.exercises = this.exercises.filter(el => el.id != exerciseId);
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Exercise deleted unsuccessfully!", "Close", false);
      }
    })
  }
  onSelect() {
    if (this.startDate.value != null && this.endDate.value != null) {
      this.clientService.getProgressChartValues({
        startDate: this.startDate.value,
        endDate: this.endDate.value
      }).subscribe({
        next: (data) => {
          this.xAxis = data.xaxis;
          this.yAxis = data.yaxis;  
        },
        error: (err) => {
          this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
        }
      })
    }
  }
  onAddEntry() {
    let request = {
      weight: this.myWeight.value,
      date: this.myDate.value
    }
    this.clientService.insertProgressEntry(request).subscribe({
      next: (data) => {
        this.snackBarService.openSnackBar("Progress updated successfully!", "Close", true);
        this.addEntryForm.reset();
        this.xAxis = data.xaxis;
        this.yAxis = data.yaxis; 
        this.startDate.setValue(null);
        this.endDate.setValue(null);
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Progress updated unsuccessfully!", "Close", false);
        this.addEntryForm.reset();
      }
    })
  }

  onDownloadPf() {
    this.pdfService.generatePdf().subscribe({
      next: () => {
        window.open(this.pdfService.downloadPdf(), "_blank");
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
      }
    })
  }

}
