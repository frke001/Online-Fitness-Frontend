import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private uploadImgUrl = "http://localhost:9000/api/v1/image";
  constructor(private http: HttpClient) {

  }
  public uploadImage(request: any):Observable<any> {
    return this.http.post(this.uploadImgUrl, request, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  }
}
