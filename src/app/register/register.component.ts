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
  public fileControl = new FormControl(null);
  public hide = true;
  public hideRetype = true;
  public file:any;
  public imageId?: number;
  
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

  public passwordValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
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
  public onSubmit(){
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
      this.imageService.uploadImage(this.file).subscribe((res)=>{
        //this.imageId = res;
        debugger
        console.log(res);
        registerClient.profileImageId = res;
        this.file = null;
        this.authService.register(registerClient);
        this.snackService.openSnackBar("Registration successful","Close",true);
        
      });
    }else{
      this.authService.register(registerClient);
    }
    console.log(registerClient);
    
    //console.log(registerClient);
    this.registerFormStep1.reset();
    this.registerFormStep2.reset();

  }

  onFileUpload(event: any) {
    if(event.target.files.length > 0){
      this.file = event.target.files[0];
    }
  }

  public onUsernameInput(){
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
