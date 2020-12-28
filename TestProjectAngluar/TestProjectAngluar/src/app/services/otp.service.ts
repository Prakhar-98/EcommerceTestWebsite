import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  url:string;
  constructor(private httpClient:HttpClient)
  {
    this.url='https://p98testprojectwebapi.azurewebsites.net/api/';
  }
  getOtpfromApi(email:string):Observable<number>
  {
    return this.httpClient.get<number>(this.url+"Otp?email="+email);
  }
  resendOtpfromApi(email:string,otp:number)
  {
    return this.httpClient.put(this.url+"Otp?email="+email+"&otp="+otp,null);
  }
}