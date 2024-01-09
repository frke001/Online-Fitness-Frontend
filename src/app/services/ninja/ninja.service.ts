import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class NinjaService {

  private baseUrl: string = 'https://api.api-ninjas.com/v1/exercises?muscle=';
  constructor(private http: HttpClient) { 

  }

  public getExcersises(muscle: string): Observable<any>{
    return this.http.get(this.baseUrl + muscle, {
      headers: {
        'X-Api-Key': '1c56n/v+Jny8AdLL8VsvoQ==xvsOMG9dCGpSKYW3'
      }
    });
  }
}
