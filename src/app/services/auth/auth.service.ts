import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterClient } from '../../model/registerClient';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "http://localhost:9000/api/v1/auth/register";
  private checkDetailsUrl = "http://localhost:9000/api/v1/auth/check-details";
  private activateUrl = "http://localhost:9000/api/v1/auth/activate";
  private loginUrl = "http://localhost:9000/api/v1/auth/login";
  constructor(private http: HttpClient) { }

  public register(request: RegisterClient){
      this.http.post(this.baseUrl, request).subscribe((data)=> console.log("post: " + data));
  }
  public checkDetails(request: any) : Observable<Object>{
    console.log(request);
    return this.http.post(this.checkDetailsUrl, request).pipe();
  }

  public activate(token: any): Observable<Object>{
    return this.http.post(this.activateUrl, token).pipe();
  }

  public login(request: any): Observable<Object>{
    return this.http.post(this.loginUrl, request).pipe();
  }
}
