import { Component } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RegisterClient } from '../model/registerClient';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, RouterLink,FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  public registerForm: FormGroup;
  public passwordsMissmath: boolean = true;
  public registerClient?: RegisterClient;
  public mailOk: boolean = true;
  public usernameOk: boolean = true;
  constructor(private formBuilder: FormBuilder,private authService: AuthService){

    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      surname: [null, Validators.required],
      city: [null, Validators.required],
      mail: [null, [Validators.required, Validators.email]],
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8), this.passwordValidator]],
      retypePassword: [null, [Validators.required, Validators.minLength(8),this.passwordValidator]]
    });
    
  }

  public passwordValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[0-9]/.test(password);
  
    return !hasUpperCase || !hasSpecialCharacter ? { invalidPassword: true } : null;
  };

  public passwordMissmatch(){
    const password = this.registerForm.controls['password'].value;
    const retypePassword = this.registerForm.controls['retypePassword'].value;
    return password !== retypePassword;
  }

  onRetypePasswordChange(event : any) {
    const password = this.registerForm.controls['password'].value;
    const retypePassword = this.registerForm.controls['retypePassword'].value;
    // console.log("P: " + password);
    // console.log("RP: " + retypePassword);
    // console.log(event.target.value);
    this.passwordsMissmath = password !== retypePassword;
    // console.log(this.passwordsMissmath);
  }
  public onSubmit(){
    console.log("submit");
    this.registerClient = {
      name: this.registerForm.value.name,
      surname: this.registerForm.value.surname,
      city: this.registerForm.value.city,
      mail: this.registerForm.value.mail,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
    }
    this.authService.register(this.registerClient);
    console.log(this.registerClient);
    this.registerForm.reset();
  }

  public onUsernameInput(){
    this.authService.checkDetails({
      username: this.registerForm.value.username,
    }).subscribe((data)=>{
      if(data){
        this.usernameOk = false;
      }else{
        this.usernameOk = true;
      }
      
    });
  }
  public onMailInput(){
    this.authService.checkDetails({
      mail: this.registerForm.value.mail,
    }).subscribe((data)=>{
      if(data){
        this.mailOk = false;
      }else{
        this.mailOk = true;
      }
      
    });
  }

}
