import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { LoginClient } from '../model/loginClient';
import { HttpErrorResponse } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Observable, catchError, finalize, of } from 'rxjs';
import { CustomSnackBarComponent } from '../custom-snack-bar/custom-snack-bar.component';
import { SnackBarService } from '../services/snackbar/snack-bar.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, FormsModule, ReactiveFormsModule, CustomSnackBarComponent, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  public loginForm: FormGroup;
  public submitted = false;
  public errorHappened: boolean = false;
  public username = new FormControl(null, [Validators.required]);
  public password;
  public hide = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar
    , private snackBarService: SnackBarService) {
    this.password = new FormControl(null, [Validators.required, Validators.minLength(8), this.passwordValidator]);
    this.loginForm = this.formBuilder.group({
      password: this.password,
      username: this.username
    })
  }

  public passwordValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[0-9]/.test(password);

    return !hasUpperCase || !hasSpecialCharacter ? { invalidPassword: true } : null;
  };

  public onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login({
      username: this.username.value,
      password: this.password.value
    }).subscribe({

      next: (data) => {
        localStorage.setItem("token", data.token);
        this.router.navigateByUrl("/home");

      },
      error: (err) => {
        if (err.status === 401) {
          this.snackBarService.openSnackBar("Invalid credentials", "Close", false);
        }
        if (err.status === 403) {
          this.snackBarService.openSnackBar("Your account is blocked", "Close", false);
        }
        if (err.status === 406) {
          this.authService.resendActivation({
            username: this.username.value
          });
          this.snackBarService.openSnackBar("Not activated, activation mail is sent again", "Close", true);
        }
      }
    });
    // if(this.resend){
    //   this.authService.resendActivation({
    //     username: this.username.value
    //   });
    // }

  }

}
