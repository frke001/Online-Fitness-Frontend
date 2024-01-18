import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FitnessProgramService {

  baseUrl: string = 'http://localhost:9000/api/v1/fitness-programs';
  constructor(private http: HttpClient, private authService:AuthService) {

   }

   getFitnessProgram(id: any): Observable<any>{
      return this.http.get(this.baseUrl + '/' + id);
   }

   getFitnessPrograms(request: any, page: any, size: any): Observable<any>{
      return this.http.post(this.baseUrl + `?page=${page}&size=${size}`, request);
   }

   askQuestion(id: any, request: any) : Observable<any>{
    return this.http.post(this.baseUrl + '/' + id + '/question', request);
   }

   getAll():Observable<any>{
      return this.http.post(this.baseUrl + '/info', {
         id: this.authService.getId()
      });
   }
}
