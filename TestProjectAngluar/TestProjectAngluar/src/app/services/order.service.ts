import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { OrderDetails } from '../models/OrderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url:string;
  constructor(private httpCilent:HttpClient,private httpCilent1:HttpClient,private httpCilent2:HttpClient) { 
    this.url="https://p98testprojectwebapi.azurewebsites.net/api/";
  }
  getAllOrdesFromAPI(userId: any):Observable<Order[]> {
    return this.httpCilent1.get<Order[]>(this.url+"Order/"+userId);
  }
  getOrderDetailsFromApi(orderId: any):Observable<OrderDetails[]> {
    return this.httpCilent.get<OrderDetails[]>(this.url+"OrderDetails/"+orderId);
  }
  getOrdesFromAPI():Observable<Order[]> {
    return this.httpCilent1.get<Order[]>(this.url+"Order/");
  }

}
