import { Component } from '@angular/core';
import { AbstractControl,FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RegisterClient } from '../model/registerClient';
import { AuthService } from '../services/auth/auth.service';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ImageService } from '../services/image/image.service';
import { SnackBarService } from '../services/snackbar/snack-bar.service';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, RouterLink,FormsModule, ReactiveFormsModule,MatStepperModule,MatFormFieldModule,MatInputModule,MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {



  registerFormStep1: FormGroup;
  registerFormStep2: FormGroup;
  passwordsMissmath: boolean = true;
  mailOk: boolean = true;
  usernameOk: boolean = true;
  name = new FormControl(null, [Validators.required]);
  surname = new FormControl(null, [Validators.required]);
  city = new FormControl(null, [Validators.required]); 
  mail = new FormControl(null, [Validators.required, Validators.email]);
  username = new FormControl(null, [Validators.required]);
  password;
  retypePassword;
  fileControl = new FormControl(null);
  hide = true;
  hideRetype = true;
  file:any;
  imageId?: number;
  
  constructor(private formBuilder: FormBuilder,private authService: AuthService, private imageService: ImageService, private snackService: SnackBarService){

     
    this.password = new FormControl(null, [Validators.required, Validators.minLength(8), this.passwordValidator]);
    this.retypePassword = new FormControl(null, [Validators.required, Validators.minLength(8), this.passwordValidator]);
    this.registerFormStep1 = this.formBuilder.group({
      name: this.name,
      surname: this.surname,
      city: this.city,
      mail: this.mail,
    })
    this.registerFormStep2 = this.formBuilder.group({
      username: this.username,
      password: this.password,
      retypePassword: this.retypePassword,
      fileControl: this.fileControl
    })
    
  }

  passwordValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[0-9]/.test(password);
  
    return !hasUpperCase || !hasSpecialCharacter ? { invalidPassword: true } : null;
  };


  onRetypePasswordChange(event : any) {
    const password = this.password.value;
    const retypePassword = this.retypePassword.value;
    this.passwordsMissmath = password !== retypePassword;
  }
  onSubmit(){
    var registerClient: RegisterClient = {
      name: this.name.value,
      surname: this.surname.value,
      city: this.city.value,
      mail: this.mail.value,
      username: this.username.value,
      password: this.password.value,
      profileImageId: null
    }
    if(this.file){
      this.imageService.uploadImage(this.file).subscribe({
        next: (res)=>{
        registerClient.profileImageId = res;
        this.file = null;
        this.authService.register(registerClient);
        this.snackService.openSnackBar("Registration successful","Close",true);
        },
        error: (err)=>{
          this.snackService.openSnackBar("Error during communication with server!","Close",false);
        }
        
      });
    }else{
      this.authService.register(registerClient);
    }
    this.registerFormStep1.reset();
    this.registerFormStep2.reset();

  }

  onFileUpload(event: any) {
    if(event.target.files.length > 0){
      this.file = event.target.files[0];
    }
  }

  onUsernameInput(){
    this.authService.checkDetails({
      username: this.username.value,
    }).subscribe((data)=>{
       this.usernameOk = !data;
    });
  }
  onMailInput(){
    this.authService.checkDetails({
      mail: this.mail.value,
    }).subscribe((data)=>{
      this.mailOk = !data;
    });
  }

}
