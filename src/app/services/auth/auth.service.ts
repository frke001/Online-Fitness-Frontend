import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterClient } from '../../model/registerClient';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Client } from '../../model/client';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "http://localhost:9000/api/v1/auth/register";
  private checkDetailsUrl = "http://localhost:9000/api/v1/auth/check-details";
  private activateUrl = "http://localhost:9000/api/v1/auth/activate";
  private resendUrl = "http://localhost:9000/api/v1/auth/resend-activation";
  private loginUrl = "http://localhost:9000/api/v1/auth/login";


  constructor(private http: HttpClient) { }

  public register(request: any){
      this.http.post(this.baseUrl, request).subscribe((data)=> {});
  }
  public checkDetails(request: any) : Observable<any>{
    return this.http.post(this.checkDetailsUrl, request);
  }

  public activate(token: any): Observable<any>{
    return this.http.post(this.activateUrl, token);
  }
  public resendActivation(request: any){
    this.http.post(this.resendUrl, request).subscribe((data)=>{});
  }

  public login(request: any): Observable<any>{
    return this.http.post(this.loginUrl, request);
  }

  public decodeToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        return jwt_decode.jwtDecode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
  public isLoggedIn(): boolean{
    const token = localStorage.getItem('token');
    return !!token && !this.isTokenExpired();
  }

  public logout() {
    localStorage.removeItem('token');
  }
  private getExpiryTime() {
    this.decodeToken();
    return this.decodeToken() ? this.decodeToken().exp : null;
  }

  public isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
