import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private uploadImgUrl = "http://localhost:9000/api/v1/image";
  private downloadImgUrl = "http://localhost:9000/api/v1/image/";
  constructor(private http: HttpClient) {

  }
  public uploadImage(url: any): Observable<any> {
    const formData = new FormData();
    formData.append("image", url);
    return this.http.post(this.uploadImgUrl, formData);
  }

  public downloadImage(id: any): string{
    return this.downloadImgUrl + id;
  }
}
