import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FitnessProgramService {

  baseUrl: string = 'http://localhost:9000/api/v1/fitness-programs/';
  constructor(private http: HttpClient) {

   }

   getFitnessProgram(id: any): Observable<any>{
    return this.http.get(this.baseUrl + id);
   }
}
