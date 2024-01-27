import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  baseUrl: string = 'http://localhost:9000/api/v1/pdf/';
  constructor(private http: HttpClient,private authService: AuthService) { }

  generatePdf(){
    return this.http.post(this.baseUrl + this.authService.getId(), {});
  }
  downloadPdf(): string {
    return this.baseUrl + this.authService.getId();
  }
}
