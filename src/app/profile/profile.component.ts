import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image/image.service';
import { AuthService } from '../services/auth/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ClientUpdate } from '../model/clientUpdate';
import { ClientService } from '../services/client/client.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SnackBarService } from '../services/snackbar/snack-bar.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, MatTooltipModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {



  public defaultImageUrl: string = "../../assets/profileImage.png"
  public profileForm: FormGroup
  public name = new FormControl(null, [Validators.required]);
  public surname = new FormControl(null, [Validators.required]);
  public city = new FormControl(null, [Validators.required]);
  public mail = new FormControl(null, [Validators.required, Validators.email]);
  public username: string = '';
  public profileImage: any = this.defaultImageUrl;
  public update: boolean = false;

  public passwordForm: FormGroup
  public password;
  public retypePassword;
  public oldPassword;
  public passwordsMissmath: boolean = true;
  public hide = true;
  public hideRetype = true;
  public hideOld = true;
  constructor(private imageService: ImageService, private authService: AuthService, private formBuilder: FormBuilder, private clientService: ClientService, private snackBarService: SnackBarService) {
    this.profileForm = formBuilder.group({
      name: this.name,
      surname: this.surname,
      city: this.city,
      mail: this.mail
    });
    this.password = new FormControl(null, [Validators.required, Validators.minLength(8), this.passwordValidator]);
    this.retypePassword = new FormControl(null, [Validators.required, Validators.minLength(8), this.passwordValidator]);
    this.oldPassword = new FormControl(null, [Validators.required, Validators.minLength(8), this.passwordValidator]);
    this.passwordForm = formBuilder.group({
      password: this.password,
      retypePassword: this.retypePassword,
      oldPassword: this.oldPassword
    })
    this.clientService.getDetails()
      .subscribe({
        next: (data) => {
          console.log(data)
          this.name.setValue(data.name);
          this.surname.setValue(data.surname);
          this.city.setValue(data.city);
          this.mail.setValue(data.mail);
          snackBarService.openSnackBar("Successful profile details fetch!", "Close", true);
        },
        error: (err) => {
          snackBarService.openSnackBar("Unsuccessful profile details fetch!", "Close", false);
        }
      });
    this.username = authService.getUsername();
    this.clientService.getProfileImageId().subscribe({
      next: (res) => {
        if (res) {
          let image = this.imageService.downloadImage(res);
          this.profileImage = image;
        }
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
      }
    })
  }

  public passwordValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[0-9]/.test(password);

    return !hasUpperCase || !hasSpecialCharacter ? { invalidPassword: true } : null;
  };

  onRetypePasswordChange(event: any) {
    const password = this.password.value;
    const retypePassword = this.retypePassword.value;
    this.passwordsMissmath = password !== retypePassword;
  }
  public onSave() {
    let request = {
      name: this.name.value,
      surname: this.surname.value,
      city: this.city.value,
      mail: this.mail.value
    }
    this.clientService.updateProfile(request).pipe(
      catchError((err) => {
        this.snackBarService.openSnackBar("Action unsuccessful!", "Close", false)
        return of([]);
      })
    ).subscribe((data) => {
      this.snackBarService.openSnackBar("Profile updated successfully!", "Close", true);
    });
    this.update = false;
  }

  onFileUpload(event: any) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      if (file) {
        this.imageService.uploadImage(file).subscribe((res) => {
          let image = this.imageService.downloadImage(res);
          this.profileImage = image;

          this.clientService.updateProfileImage(res).subscribe((res) => {
            if (!res) {
              this.snackBarService.openSnackBar("Unsuccessfull action!", "Close", false);
            } else {
              this.snackBarService.openSnackBar("Profile picture successfully changed!", "Close", true);
              window.location.reload();
            }
          });
        });
      }
    }
  }
  public onUpdateChange() {
    this.update = !this.update;
  }

  onUpdatePassword() {
    debugger
    let request = {
      oldPassword: this.oldPassword.value,
      newPassword: this.password.value
    }
    this.clientService.updatePassword(request).subscribe((data) => {
      if (data) {
        this.snackBarService.openSnackBar("Password changed successfully!", "Close", true);
      } else {
        this.snackBarService.openSnackBar("Action unsuccessful!", "Close", false);
      }
    })
  }
}
