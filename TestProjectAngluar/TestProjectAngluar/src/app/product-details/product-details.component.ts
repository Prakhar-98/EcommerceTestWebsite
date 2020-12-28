import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product:Product;
  currentimg:string;
  inSession:boolean;
  inProcessing:boolean;  
  user:User;
  inCart:boolean;
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute,private local:LocalStorageService,private cService:CartService) 
  { 
    this.inProcessing=false;
    this.productService.getProduct(this.activatedRoute.snapshot.params.id).subscribe((data)=>{
      this.product=data;
      this.currentimg=data.productImg1;
      //this.currentindex
    });
    if(this.local.retrieve('user')!=null)
    {
      this.inSession=true;
      this.user=this.local.retrieve('user');
      this.cService.getProductsFromCart(this.user.userId).subscribe(d=>
        {
          if(d.some(c=>c.productId==this.activatedRoute.snapshot.params.id))this.inCart=true;
        });
    }
    else this.inSession=false;
    
  }

  ngOnInit(): void {

  }
  changeImg(n:number)
  {
    if(n==1)this.currentimg=this.product.productImg1;
    if(n==2)this.currentimg=this.product.productImg2;
    if(n==3)this.currentimg=this.product.productImg3;
    if(n==4)this.currentimg=this.product.productImg4;
  }
  addToCart()
  {
    this.inProcessing=true;
    this.cService.addCart(new Cart(this.activatedRoute.snapshot.params.id,this.user.userId,1)).subscribe((data)=>
    {
      this.inCart=true;
      this.inProcessing=false;
    });
  }
  removeFromCart()
  {
    this.inProcessing=true;
    this.cService.removeFromCart(new Cart(this.activatedRoute.snapshot.params.id,this.user.userId,1)).subscribe((data)=>
    {
      this.inCart=false;
      this.inProcessing=false;
    });
  }

}
