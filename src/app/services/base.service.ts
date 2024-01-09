import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private baseUrl: string = "http://localhost:9000/api/v1/";
  constructor() { }

  getbaseUrl():string{
    return this.baseUrl;
  }
}
