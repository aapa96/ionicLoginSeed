import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment, } from 'src/environments/environment';   
const TOKEN = 'userToken';
@Injectable()
export class ResourcesService { 
  private httpOptions: any; 
  public token:any;
  constructor(
    private http: HttpClient
  ) { 
    this.token = this.getTokenToLocalStorage()?this.getTokenToLocalStorage() : null;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = { alert: '', message: '' };
    if (error.error instanceof ErrorEvent) { 
      errorMessage = { alert: error.error.message || 'error', message: error.error.message || 'error' };
    } else { 
      errorMessage = { alert: `Error Code: ${error.status}\nMessage: ${error.message}`, message: error.error.message || 'error' };
    } 
    if(errorMessage){
      console.log(errorMessage);
    }
    return throwError(errorMessage);
  } 
  setTokenToLocalStorage(token){
    return window.localStorage.setItem(TOKEN,token);
  }
  getTokenToLocalStorage(){
    return window.localStorage.getItem(TOKEN);
  }
  login(data){
    return this.http.post(environment.apiUrl + 'users/login', data, this.httpOptions).pipe(catchError(this.handleError)); 
  }
  logout(){
    window.localStorage.clear();
    this.token = null;
    window.location.replace('/login')
  }
}