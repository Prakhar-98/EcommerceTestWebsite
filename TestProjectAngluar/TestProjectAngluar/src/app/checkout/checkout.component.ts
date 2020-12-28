import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Address } from '../models/Address';
import { Cart } from '../models/Cart';
import { User } from '../models/User';
import { CartService } from '../services/cart.service';
import { PaymentService } from '../services/payment.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  address:Address;
  cartModels:Cart[];
  user:User;
  cartTotal:number=0;
  message:string;
  validAddrress:boolean;
  orderId:string;
  constructor(private cservice:CartService,private local:LocalStorageService,private pService:ProductService,private router:Router,private payService:PaymentService) 
  {
    this.address=new Address();
    this.message='';
    this.cartTotal=0;
    this.validAddrress=false;
    this.user=this.local.retrieve('user');
    if(this.user!=null)
    {
      this.cservice.getProductsFromCart(this.user.userId).subscribe((data)=>
    {
      this.cartModels=data;
    if(this.cartModels!=undefined)this.cartModels.forEach((v)=>
    {
      this.cartTotal+=v.quantity*v.product.productPrice;
    });
    });
    this.payService.getOrderIdfromApi(this.user.userId).subscribe((data)=>{
      this.orderId=data;
    });
  }
  }

  ngOnInit(): void {
  }
  placeOrder(addressForm:NgForm)
  {
    if(addressForm.valid)
  {
    this.validAddrress=true;
  /*this.cservice.checkoutFromCart(this.user.userId,this.address).subscribe(data=>{
    this.router.navigate(['/confirmOrder']);
    this.inProcess=false;
  });*/
  }
  else
  {
    this.message='Please complete the address';
  }
  }

}
