import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl: string = "http://localhost:9000/api/v1/categories";
  constructor(private http: HttpClient) {

  }
  getAllCategories() : Observable<any>{
    return this.http.get(this.baseUrl);
  }
}
