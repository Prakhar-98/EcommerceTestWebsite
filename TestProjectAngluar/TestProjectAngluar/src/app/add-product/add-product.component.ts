import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product:Product;
  message:string;
  ProductImg1:File|null;
  ProductImg2:File|null;
  ProductImg3:File|null;
  ProductImg4:File|null;
  inProcess:boolean;
  constructor(private productService:ProductService,private local:LocalStorageService,private router:Router,private snackBar:MatSnackBar) {
    this.product=new Product();
    this.inProcess=false;
    this.message='';
  }

  ngOnInit(): void {
  }

  onFileSelected(event,choice:number)
  {
    if(choice==1)this.ProductImg1= event.target.files[0];
    if(choice==2)this.ProductImg2= event.target.files[0];
    if(choice==3)this.ProductImg3= event.target.files[0];
    if(choice==4)this.ProductImg4= event.target.files[0];
  }
  addProduct(add:NgForm)
  {
    if(add.valid)
    {
    /*this.productService.addProduct(this.product).subscribe(d=>{
      this.router.navigate(['retailer/productstatus']);
    });*/
    this.inProcess=true;
    const formData = new FormData();
    formData.append('Name',this.product.productName);
    formData.append('File1', this.ProductImg1);
    formData.append('File2', this.ProductImg2);
    formData.append('File3', this.ProductImg3);
    formData.append('File4', this.ProductImg4);
    this.productService.uploadItemImages(formData).subscribe(pl=>{
      this.product.productImg1=pl.pImage1;
      this.product.productImg2=pl.pImage2;
      this.product.productImg3=pl.pImage3;
      this.product.productImg4=pl.pImage4;
      this.productService.addProduct(this.product).subscribe(data=>{
        this.inProcess=false;
        this.openSnackBar("Product Added Successfully");
        add.reset();
      });
      
    });
  }
    else
    {
      this.openSnackBar('Please enter all required fields');
      console.log(this.ProductImg1.size);
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
       duration: 2000,
    });
 } 
}