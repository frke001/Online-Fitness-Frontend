import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.css'
})
export class ActivateComponent implements OnInit{

  public isTokenValid: boolean = false;
  public token: string = "";

  constructor(private authService:AuthService, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      this.token = token;
    });
    this.authService.activate({
      token: this.token,
    }).subscribe((data)=>{
      if(data){
        this.isTokenValid = true;
      }else{
        this.isTokenValid = false;
      }
    })
  }

}
