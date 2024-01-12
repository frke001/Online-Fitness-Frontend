import { Component } from '@angular/core';
import { ClientService } from '../services/client/client.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { SnackBarService } from '../services/snackbar/snack-bar.service';

@Component({
  selector: 'app-participate',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink, MatSelectModule],
  templateUrl: './participate.component.html',
  styleUrl: './participate.component.css'
})
export class ParticipateComponent {

  participateForm: FormGroup;
  paymentType = new FormControl(null, [Validators.required]);
  cardNumber = new FormControl(null, []);
  mail = new FormControl(null, []);
  id: any;
  constructor(private clientService: ClientService, private formBuilder: FormBuilder,private route: ActivatedRoute, 
    private snackBarService: SnackBarService) {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {

      }
    });
    this.participateForm = this.formBuilder.group({
      paymentType: this.paymentType,
      cardNumber: this.cardNumber,
      mail: this.mail
    })

  }

  onSelectionChange(event: any){
    if(event.value === 'Card'){
      this.cardNumber.addValidators([Validators.required]);
      this.mail.clearValidators();
    }else if(event.value === 'Paypal'){
      this.cardNumber.clearValidators();
      this.mail.addValidators([Validators.required]);
    }else{
      this.cardNumber.clearValidators();
      this.mail.clearValidators();
    }
  }
  onParticipate() {
    this.clientService.participateInProgram(this.id).subscribe({
        next: (data)=>{
          console.log(data);
          this.snackBarService.openSnackBar("Participation successful!", "Close", true);
        },
        error: (err)=>{
            this.snackBarService.openSnackBar("Error durong communication with server!", "Close", false);
        }
    })
  }
}
