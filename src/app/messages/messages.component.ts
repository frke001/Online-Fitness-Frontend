import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClientService } from '../services/client/client.service';
import { SnackBarService } from '../services/snackbar/snack-bar.service';
import { AuthService } from '../services/auth/auth.service';
import { ImageService } from '../services/image/image.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {


  defaultUserImage: any = '../../../assets/profileImage.png';
  form: FormGroup;
  user = new FormControl(null, [Validators.required]);
  text = new FormControl(null, [Validators.required]);
  users: Array<any> = [];
  messages: Array<any> = [];
  indexes: Array<any> = [];
  constructor(private builder: FormBuilder, private clientService: ClientService, 
    private snackBarService: SnackBarService, private authService: AuthService,
    private imageService:ImageService) {

    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.users = data.filter((el: any) => el.id != this.authService.getId());
      
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false)
      }
    })

    this.form = this.builder.group({
      user: this.user,
      text: this.text
    })

    this.clientService.getAllMessages().subscribe({
      next: (data) => {
        this.messages = data;
        this.messages.map(el=>this.indexes[el.id] = true)
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false)
      }
    })
  }

  onSave() {

    let request = {
      receiverId: this.user.value,
      text: this.text.value
    }
    this.clientService.insertMessage(request).subscribe({
      next: (data) => {
        this.messages.unshift(data);
        // this.messages.map(el=>this.indexes[el.id] = true)
        this.messages.map(el=>this.indexes[el.id] = true)
        this.snackBarService.openSnackBar("Message sent successfully!", "Close", true)
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Message sent unsuccessfully!", "Close", false)
      }
    })
    this.form.reset();
  }
  onUpdateChange() {
    this.form.reset();
  }
  getUserImage(id: any): string {
    let image = this.imageService.downloadImage(id);
    return image ? image : this.defaultUserImage;
  }
  onCollapse(mess: any) {
    if(!mess.isRead && this.authService.getId() != mess.clientSenderId){
      this.clientService.updateMessage(mess.id).subscribe({
        next: (data) => {
          let idx = this.messages.indexOf(mess);
          this.messages[idx] = data;
          //this.indexes[mess.id] = 
          this.indexes[mess.id] = !this.indexes[mess.id];
          this.snackBarService.openSnackBar("Message read successfully!", "Close", true)
        },
        error: (err) => {
          this.snackBarService.openSnackBar("Error during communication with server!", "Close", false)
        }
      })
    }else{
      this.indexes[mess.id] = !this.indexes[mess.id];
    }

  }
  getId(){
    return this.authService.getId();
  }
 
}
