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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, RouterLink,FormsModule, ReactiveFormsModule,MatStepperModule,MatFormFieldModule,MatInputModule,MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {



  public registerFormStep1: FormGroup;
  public registerFormStep2: FormGroup;
  public passwordsMissmath: boolean = true;
  public mailOk: boolean = true;
  public usernameOk: boolean = true;
  public name = new FormControl(null, [Validators.required]);
  public surname = new FormControl(null, [Validators.required]);
  public city = new FormControl(null, [Validators.required]); 
  public mail = new FormControl(null, [Validators.required, Validators.email]);
  public username = new FormControl(null, [Validators.required]);
  public password;
  public retypePassword;
  public hide = true;
  public hideRetype = true;
  public file:any;
  public imageId?: number;
  
  constructor(private formBuilder: FormBuilder,private authService: AuthService, private imageService: ImageService){

     
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
      retypePassword: this.retypePassword
    })
    
  }

  public passwordValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[0-9]/.test(password);
  
    return !hasUpperCase || !hasSpecialCharacter ? { invalidPassword: true } : null;
  };

  // public passwordMissmatch(){
  //   const password = this.registerForm.controls['password'].value;
  //   const retypePassword = this.registerForm.controls['retypePassword'].value;
  //   return password !== retypePassword;
  // }

  onRetypePasswordChange(event : any) {
    const password = this.password.value;
    const retypePassword = this.retypePassword.value;
    // console.log("P: " + password);
    // console.log("RP: " + retypePassword);
    // console.log(event.target.value);
    this.passwordsMissmath = password !== retypePassword;
    // console.log(this.passwordsMissmath);
  }
  public onSubmit(){
    console.log("submit");
    if(this.file){
      const formData = new FormData();
      formData.append("image", this.file);
      //console.log(event.target.files.length);
      this.imageService.uploadImage(formData).subscribe((res)=>{
        this.imageId = res;
      });
    }
    var registerClient = {
      name: this.name.value,
      surname: this.surname.value,
      city: this.city.value,
      mail: this.mail.value,
      username: this.username.value,
      password: this.password.value,
      profileImageId: this.imageId
    }
    this.authService.register(registerClient);
    
    console.log(registerClient);
    this.registerFormStep1.reset();
    this.registerFormStep2.reset();
  }

  onFileUpload(event: any) {
    if(event.target.files.length > 0){
      this.file = event.target.files[0];
      console.log(this.file);
      const formData = new FormData();
      formData.append("image", this.file);
      //console.log(event.target.files.length);
      this.imageService.uploadImage(formData).subscribe((res)=>{
        this.imageId = res;
      });
    }
  }

  public onUsernameInput(){
    console.log(this.username.value);
    this.authService.checkDetails({
      username: this.username.value,
      
    }).subscribe((data)=>{
       this.usernameOk = !data;
    });
  }
  public onMailInput(){
    this.authService.checkDetails({
      mail: this.mail.value,
    }).subscribe((data)=>{
      this.mailOk = !data;
    });
  }

}
