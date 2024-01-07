import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RssService {

  private baseUrl = 'http://localhost:9000/api/v1/rss';

  constructor(private http: HttpClient) {}

  public getRssFeed() {
    return this.http.get(this.baseUrl);
  }
 
}
