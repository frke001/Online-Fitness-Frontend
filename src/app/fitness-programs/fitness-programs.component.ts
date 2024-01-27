import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CategoriesService } from '../services/categories/categories.service';
import { SnackBarService } from '../services/snackbar/snack-bar.service';
import { FitnessProgramService } from '../services/fitnessProgram/fitness-program.service';
import { ImageService } from '../services/image/image.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-fitness-programs',
  standalone: true,
  imports: [MatPaginatorModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './fitness-programs.component.html',
  styleUrl: './fitness-programs.component.css'
})
export class FitnessProgramsComponent {

  defaultImage: string = '../../assets/defaultFitnes.jpg';

  length: any = 10;
  pageSize: any = 4;
  pageIndex: any = 0;
  pageSizeOptions = [4, 8];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent?: PageEvent;

  fitnessPrograms: Array<any> = [];

  searchOption = new FormControl('default');
  categoryOption = new FormControl('default');
  difficultyOption = new FormControl('default');
  locationOption = new FormControl('default');
  categoryNames: Array<any> = [];
  searchTerm = new FormControl(null);

  filterRequest: Array<any> = [];

  // @ViewChild('paginator') paginator?: MatPaginator;

  constructor(private categoryService: CategoriesService, private snackBarService: SnackBarService,
    private fitnessProgramService: FitnessProgramService, private imageService: ImageService) {

    categoryService.getAllCategoryNames().subscribe({
      next: (data) => {
        this.categoryNames = data;
      },
      error: (err) => {
        snackBarService.openSnackBar("Error during communication with server!", "Close", false);
      }
    });
    this.fitnessProgramService.getFitnessPrograms([], this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        console.log(data);
        this.fitnessPrograms = data.content;
        this.length = data.totalElements;
      },
      error: (err) => {
        snackBarService.openSnackBar("Error during communication with server!", "Close", false);
      }
    });
  }


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.onChanges();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
    console.log(this.pageSize);
    console.log(this.pageIndex);

  }

  onSearchOptionChange(event: any) {
    console.log(this.searchOption.value);
  }

  onChanges() {
    let data: Array<any> = [];
    if (this.categoryOption.value !== 'default') {
      data.push({
        columnName: 'category',
        columnValue: this.categoryOption.value
      })
    }
    if (this.difficultyOption.value !== 'default') {
      data.push({
        columnName: 'difficultyLevel',
        columnValue: this.difficultyOption.value
      })
    }
    if (this.locationOption.value !== 'default') {
      data.push({
        columnName: 'location',
        columnValue: this.locationOption.value
      })
    }
    if (this.searchOption.value !== 'default' && this.searchTerm.value !== null) {
        data.push({
          columnName: this.searchOption.value,
          columnValue: this.searchTerm.value
        })
    }
    console.log(data);
    this.fitnessProgramService.getFitnessPrograms(data, this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.fitnessPrograms = data.content;
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
      }
    });
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
