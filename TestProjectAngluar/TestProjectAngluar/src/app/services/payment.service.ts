import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url:string;
  constructor(private httpCilent:HttpClient,private httpCilent1:HttpClient,private httpCilent2:HttpClient) { 
    this.url="https://p98testprojectwebapi.azurewebsites.net/api/";
  }
  getOrderIdfromApi(id:number):Observable<string>
  {
    return this.httpCilent.get<string>(this.url+`Razor/${id}`);
  }
}
