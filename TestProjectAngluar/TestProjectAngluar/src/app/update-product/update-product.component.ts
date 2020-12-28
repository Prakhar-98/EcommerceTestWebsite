import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product:Product;
  message:string;
  constructor(private productService:ProductService,private aroute:ActivatedRoute,private route:Router,private snackBar:MatSnackBar) { 
    this.productService.getProduct(this.aroute.snapshot.params.id).subscribe((data)=>
    {
      this.product=data;
    });
    this.message='';
  }

  ngOnInit(): void {
  }

  modifyProduct(mod:NgForm)
  {
    if(mod.valid)
    {
      if(this.product.productStatus=="Out of Stock" && this.product.productStock>0)this.product.productStatus="Available";
      if(this.product.productStatus=="Available" && this.product.productStock<=0)this.product.productStatus="Out of Stock";
     
      this.productService.updateProduct(this.product).subscribe(data=>{
        this.openSnackBar('Product Updated Successfully');
      });
  }
    else this.openSnackBar('Please enter all required fields');
  }
openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
       duration: 2000,
    });
 } 
 goback()
 {
  this.route.navigate(['admin/modifyList']);
 }
}
