import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  changePasswordFromApi(user: User) {
    return this.httpCilent.put<User>(this.url+"Login",user);
  }
  url:string;
  constructor(private httpCilent:HttpClient,private httpCilent1:HttpClient,private httpCilent2:HttpClient) { 
    this.url="https://p98testprojectwebapi.azurewebsites.net/api/";
  }
  loginFromApi(user:User):Observable<User>
  {
    return this.httpCilent.post<User>(this.url+"Login",user);
  }
  signUpFromApi(user:User):Observable<User>
  {
    return this.httpCilent1.post<User>(this.url+"Users",user);
  }
  updateFromApi(user: User):Observable<boolean> {
    return this.httpCilent1.put<boolean>(this.url+"Users/"+user.userId,user);
  }
}
