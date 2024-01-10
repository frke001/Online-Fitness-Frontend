import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CategoriesService } from '../../services/categories/categories.service';
import { SnackBarService } from '../../services/snackbar/snack-bar.service';
import { ImageService } from '../../services/image/image.service';
import { ClientService } from '../../services/client/client.service';
@Component({
  selector: 'app-add-program',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatStepperModule, MatFormFieldModule, MatInputModule, RouterLink, MatSelectModule],
  templateUrl: './add-program.component.html',
  styleUrl: './add-program.component.css'
})
export class AddProgramComponent {

  formStep1: FormGroup;
  formStep2: FormGroup;
  formStep3: FormGroup;
  name = new FormControl(null, [Validators.required]);
  price = new FormControl(null, [Validators.required, Validators.pattern("[0-9]+(\.[0-9]+)?")]);
  instructorName = new FormControl(null, [Validators.required]);
  instructorSurname = new FormControl(null, [Validators.required]);
  location = new FormControl(null, [Validators.required]);
  difficultyLevel = new FormControl(null, [Validators.required]);
  contact = new FormControl(null, [Validators.required]);
  duration = new FormControl(null, [Validators.required, Validators.pattern("[0-9]{1,3}")]);
  description = new FormControl(null, [Validators.required]);
  fileControl = new FormControl(null, [Validators.required]);
  category = new FormControl(null, [Validators.required]);
  categories: Array<any> = [];
  attributes: Array<any> = [];
  file:any;

  constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService,
     private snackBarService:SnackBarService, private imageService:ImageService, private clientService: ClientService) {

    this.formStep1 = this.formBuilder.group({
      name: this.name,
      price: this.price,
      instructorName: this.instructorName,
      instructorSurname: this.instructorSurname,
      location: this.location,
      difficultyLevel: this.difficultyLevel
    });
    this.formStep2 = this.formBuilder.group({
      duration: this.duration,
      contact: this.contact,
      description: this.description,
      fileControl: this.fileControl,
    });
    this.formStep3 = this.formBuilder.group({
      category: this.category,
    });

    this.categoriesService.getAllCategories().subscribe({
      next: (data)=>{
        this.categories = data;
      },
      error: (err) =>{
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
      }
    })
  }

  onCategorySelectionChange(event: any) {
      this.attributes = this.categories.filter((cat)=> cat.id === event.value)[0].attributes;
      
      const controls = {
        category: this.category,
        ...this.attributes.reduce((acc, attribute) => {
          acc[attribute.name] = new FormControl(null, Validators.required);
          return acc;
        }, {})
      };
      this.formStep3 = this.formBuilder.group(controls);
      console.log(this.formStep3);
  }
  onSubmit(){

    if(this.file){
      this.imageService.uploadImage(this.file).subscribe({
        next: (data) =>{
          let attrValues = this.attributes.map(attribute => {
            return { id: attribute.id, value: this.formStep3.controls[attribute.name].value };
          });
        let request = {
            name: this.name.value,
            price: this.price.value,
            instructorName: this.instructorName.value,
            instructorSurname: this.instructorSurname.value,
            location: this.location.value,
            difficultyLevel: this.difficultyLevel.value,
            days: this.duration.value,
            contact: this.contact.value,
            description: this.description.value,
            imageId: data,
            categoryId: this.category.value,
            categoryAttributeValues: attrValues
        }
        this.clientService.insertFitnessProgram(request).subscribe({
            next: (data)=>{
              this.file = null;
              this.snackBarService.openSnackBar("Fitness Program created successfully!","Close",true);
            },
            error: (err)=>{
              this.snackBarService.openSnackBar("Error during communication with server!","Close",false);
            }
        })
      },
      error: (err)=>{
        this.snackBarService.openSnackBar("Error during communication with server!","Close",false);
      }
        
      });
    }
    this.formStep1.reset();
    this.formStep2.reset();
    this.formStep3.reset();
    
  }

  onFileUpload(event: any) {
    if(event.target.files.length > 0){
      this.file = event.target.files[0];
    }
  }
}
