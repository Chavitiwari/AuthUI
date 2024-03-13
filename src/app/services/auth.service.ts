import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7172/api/User/";
  constructor(private http: HttpClient) { }

  signUp(signUpObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,signUpObj);     
  }
  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }
}
