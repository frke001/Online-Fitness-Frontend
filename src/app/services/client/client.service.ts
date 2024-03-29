import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl: string = "http://localhost:9000/api/v1/clients/";
  private baseUrlCopy: string = "http://localhost:9000/api/v1/clients";
  private updatePictureUrl: string = "http://localhost:9000/api/v1/clients/";
  constructor(private http: HttpClient, private baseService: BaseService, private authService: AuthService) {

  }

  public getDetails(): Observable<any> {
    return this.http.get(this.baseUrl + this.authService.getId());
  }

  public updateProfileImage(id: number): Observable<any> {
    return this.http.put(this.baseUrl + this.authService.getId() + '/profile-image', {
      profilePictureId: id
    })
  }

  public getProfileImageId() {
    return this.http.get(this.baseUrl + this.authService.getId() + '/profile-image');
  }

  public updateProfile(request: any): Observable<any> {
    return this.http.put(this.baseUrl + this.authService.getId() + '/profile', request);
  }

  public updatePassword(request: any): Observable<any> {
    return this.http.put(this.baseUrl + this.authService.getId() + '/change-password', request);
  }

  insertFitnessProgram(request: any): Observable<any> {
    return this.http.post(this.baseUrl + this.authService.getId() + '/fitness-programs', request);
  }

  getAllFitnessPrograms(): Observable<any> {
    return this.http.get(this.baseUrl + this.authService.getId() + '/fitness-programs')
  }

  deleteFitnessProgram(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + this.authService.getId() + '/fitness-programs/' + id);
  }

  participateInProgram(programId: any): Observable<any> {
    return this.http.post(this.baseUrl + this.authService.getId() + '/fitness-programs/' + programId + '/participate', {});
  }

  isParticipating(programId: any): Observable<any> {
    return this.http.get(this.baseUrl + this.authService.getId() + '/fitness-programs/' + programId + '/participate');
  }

  getAllFitnessProgramsInProgress(): Observable<any> {
    return this.http.get(this.baseUrl + this.authService.getId() + '/fitness-programs/in-progress');
  }
  getAllFitnessProgramsFinished(): Observable<any> {
    return this.http.get(this.baseUrl + this.authService.getId() + '/fitness-programs/finished');
  }
  getAllClients():Observable<any>{
    return this.http.get(this.baseUrlCopy);
  }
  getAllMessages():Observable<any>{
    return this.http.get(this.baseUrl + this.authService.getId() + '/messages');
  }
  insertMessage(request: any):Observable<any>{
    return this.http.post(this.baseUrl + this.authService.getId() + '/messages',request);
  }
  updateMessage(messageId:any):Observable<any>{
    return this.http.put(this.baseUrl + this.authService.getId() + '/messages/' + messageId,{});
  }
  subscribeForCategory(categoryId: any){
    return this.http.post(this.baseUrl + this.authService.getId() + '/subscribe/' + categoryId,{});
  }
  unsubscribeForCategory(categoryId: any){
    return this.http.delete(this.baseUrl + this.authService.getId() + '/unsubscribe/' + categoryId);
  }
  isSubscribed(categoryId: any){
    return this.http.get(this.baseUrl + this.authService.getId() + '/subscribe/' + categoryId);
  }
  askAdvisor(request: any):Observable<any>{
    return this.http.post(this.baseUrl + this.authService.getId() + '/ask-advisor',request);
  }
  getAllExercises():Observable<any>{
    return this.http.get(this.baseUrl + this.authService.getId() + '/exercises');
  }
  insertExercise(request :any):Observable<any>{
    return this.http.post(this.baseUrl + this.authService.getId() + '/exercises', request);
  }
  deleteExercise(exerciseId :any){
    return this.http.delete(this.baseUrl + this.authService.getId() + '/exercises/' + exerciseId);
  }
  insertProgressEntry(request: any): Observable<any>{
    return this.http.post(this.baseUrl + this.authService.getId() + '/progress', request);
  }
  getProgressChartValues(request: any):Observable<any>{
    return this.http.post(this.baseUrl + this.authService.getId() + '/progress/filter', request);
  }
}
