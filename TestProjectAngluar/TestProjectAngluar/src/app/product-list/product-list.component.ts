import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,DoCheck {

  @Input()minPrice;
  @Input()maxPrice;
  @Input()sortType:number;
  productList: Product[] = []
  currentproductList: Product[] = []
  cartProductList:Cart[]=[]
  searchbar:string;
  user:User;
  constructor(private productService:ProductService,private aroute:ActivatedRoute,private cartService:CartService,private local:LocalStorageService)
  {
    
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data)=>
    {
      this.productList=data.filter(p=>p.productStatus=='Available' && p.productStock>0);
      this.currentproductList=this.productList;
    });
    this.user=this.local.retrieve('user');
    if(this.user!=null)this.cartService.getProductsFromCart(this.user.userId).subscribe(p=>
      {
        this.cartProductList=p;
      });
    this.searchbar='';
  }
  
  ngDoCheck()
  {
    
    this.currentproductList=this.productList.filter(p=>p.productName.toLowerCase().includes(this.searchbar.toLowerCase())||p.productDescription.toLowerCase().includes(this.searchbar.toLowerCase()));
    this.currentproductList=this.currentproductList.filter(p=>p.productPrice>=this.minPrice && p.productPrice<=this.maxPrice);
      if(this.sortType==1)this.currentproductList.sort((a,b)=>a.productPrice-b.productPrice);
      else if(this.sortType==2)this.currentproductList.sort((a,b)=>b.productPrice-a.productPrice);
      else if(this.sortType==3)this.currentproductList.sort((a,b)=>a.productName.localeCompare(b.productName));
      else if(this.sortType==4)this.currentproductList.sort((a,b)=>b.productName.localeCompare(a.productName));
  }
  checkInCart(product:Product):boolean
  {
    return this.cartProductList.some(c=>c.productId==product.productId);
  }
}