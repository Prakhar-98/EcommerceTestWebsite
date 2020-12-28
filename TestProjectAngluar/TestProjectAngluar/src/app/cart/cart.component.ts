import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Cart } from '../models/Cart';
import { User } from '../models/User';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,DoCheck {

  cartModels:Cart[];
  user:User;
  cartTotal:number=0;
  message:string;
  constructor(private cservice:CartService,private local:LocalStorageService,private pService:ProductService,private router:Router)
  {
    this.message='';
    this.user=this.local.retrieve('user');
    if(this.user!=null)this.cservice.getProductsFromCart(this.user.userId).subscribe((data)=>
    {
      this.cartModels=data;
    });
  }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.cartTotal=0;
    if(this.cartModels!=undefined)this.cartModels.forEach((v)=>
    {
      this.cartTotal+=v.quantity*v.product.productPrice;
    });
  }
  increaseQuntity(cartModel:Cart)
{
  cartModel.quantity++;
}
decreseQuantity(cartModel:Cart)
{
  cartModel.quantity--;
  if(cartModel.quantity==0)this.removeFromCart(cartModel);
}
removeFromCart(cartModel:Cart)
{
  this.cservice.removeFromCart(cartModel).subscribe((d)=>
    {
      this.cartModels.splice(this.cartModels.findIndex((c)=>c.productId= cartModel.productId),1);
    }
  )
}
checkout()
{
  this.cservice.updateCart(this.cartModels).subscribe(data=>
    {
      this.router.navigate(['checkout']);
    }
    
  );
  
}
}
