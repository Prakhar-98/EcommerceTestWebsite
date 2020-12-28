import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit,DoCheck {

  @Input() productItem:Product;
  @Input() inCart:boolean;
  inProcess:boolean;
  user:User;
  constructor(private router:Router,private cService:CartService,private local:LocalStorageService ) {
    
   }

  ngOnInit(): void {
    this.user=this.local.retrieve('user');
    this.inProcess=false;
  }
  ngDoCheck()
  {
    this.user=this.local.retrieve('user');
  }
  addToCart()
  {
    this.inProcess=true;
    if(this.user!=null)this.cService.addCart(new Cart(this.productItem.productId,this.user.userId,1)).subscribe((data)=>
    {
      this.inCart=true;
      this.inProcess=false;
    });
  }
  removeFromCart()
  {
    this.inProcess=true;
    if(this.user!=null)this.cService.removeFromCart(new Cart(this.productItem.productId,this.user.userId,1)).subscribe((data)=>
    {
      this.inCart=false;
      this.inProcess=false;
    });
  }
  viewDetails()
  {
    this.router.navigate(['ViewDetails',this.productItem.productId]);
  }

}
