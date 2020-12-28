import { PlaceOrderView } from './../models/PlaceOrderView';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/Address';
import { Cart } from '../models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  
  url:string;
  constructor(private httpCilent:HttpClient,private httpCilent1:HttpClient,private httpCilent2:HttpClient) { 
    this.url="https://p98testprojectwebapi.azurewebsites.net/api/";
  }
  getProductsFromCart(userId: number):Observable<Cart[]> {
    return this.httpCilent1.get<Cart[]>(this.url+"Carts/"+userId);
  }
  removeFromCart(arg0: Cart) {
    return this.httpCilent.delete(this.url+"Carts?UserId="+arg0.userId+"&ProductId="+arg0.productId);
  }
  addCart(arg0: Cart) {
    return this.httpCilent2.post(this.url+"Carts",arg0);
  }
  checkoutFromCart(userId: number, placeOrderView:PlaceOrderView) {
    return this.httpCilent2.post(this.url+"Order/"+userId,placeOrderView);
  }
  updateCart(cartModels: Cart[]) {
    return this.httpCilent2.put(this.url+"Carts",cartModels);
  }
}
