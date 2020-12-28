import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-status',
  templateUrl: './product-status.component.html',
  styleUrls: ['./product-status.component.css']
})
export class ProductStatusComponent implements OnInit {
  products:Product[];
  message:string="";
  constructor(private productService:ProductService,private local:LocalStorageService) { 
    productService.getAllProducts().subscribe(data=>{
      this.products=data;
    });
  }
 
  ngOnInit(): void {
  }

}
