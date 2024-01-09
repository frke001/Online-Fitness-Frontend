import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NinjaService } from '../../services/ninja/ninja.service';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [MatTooltipModule, MatDividerModule, MatButtonModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css'
})
export class ExercisesComponent {
    muscles: string[] = [
      'abdominals',
      'abductors',
      'adductors',
      'biceps',
      'calves',
      'chest',
      'forearms',
      'glutes',
      'hamstrings',
      'lats',
      'lower_back',
      'middle_back',
      'neck',
      'quadriceps',
      'traps',
      'triceps',
    ];
    indexes : boolean[] = [];
    public collapsed: boolean = true;
    exercises: Array<any> = new Array;

    constructor(private ninjaService: NinjaService){
        this.ninjaService.getExcersises(this.muscles[0]).subscribe((data)=>{
            this.exercises = data;
        });
        this.indexes = this.muscles.map((el) => true)
        console.log(this.indexes);
    }
    onCollapse(index: number){
      this.indexes[index] = !this.indexes[index];
    }
    onChange(event : any){
      this.ninjaService.getExcersises(event.target.value).subscribe((data)=>{
        this.exercises = data;
    });
    }

}
