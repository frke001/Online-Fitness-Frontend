import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { CreatedComponent } from './created/created.component';
import { FinishedComponent } from './finished/finished.component';
import { InProgressComponent } from './in-progress/in-progress.component';
@Component({
  selector: 'app-my-fitness-programs',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule, CreatedComponent, FinishedComponent, InProgressComponent],
  templateUrl: './my-fitness-programs.component.html',
  styleUrl: './my-fitness-programs.component.css'
})
export class MyFitnessProgramsComponent {

}
