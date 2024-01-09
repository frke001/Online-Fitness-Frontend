import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ImageService } from '../services/image/image.service';
import { Observable, catchError, of } from 'rxjs';
import { ClientService } from '../services/client/client.service';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive, RouterOutlet, MatIconModule, MatTooltipModule,MatDividerModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  public downloadedImageUrl?: string
  public defaultImageUrl: string = "../../assets/profileImage.png"
  public profileImage: any = this.defaultImageUrl;
  public error: boolean = false;
  constructor(private authService: AuthService, private imageService: ImageService, private clientService: ClientService) {
    debugger
    this.clientService.getProfileImageId()
    .subscribe((res) => {
        if (res) {
          let image = this.imageService.downloadImage(res);
          this.profileImage = image ? image : this.defaultImageUrl;
        } 
    })
  }
  public isLoggedIn(): boolean {
    let result: boolean = this.authService.isLoggedIn();
    return result;
  }
  public getUsername():string{
    return this.authService.getUsername();
  }
  public onLogout() {
    this.authService.logout();
  }
}
