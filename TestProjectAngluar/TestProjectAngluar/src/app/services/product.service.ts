import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { ProductLinks } from '../models/ProductLinks';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  url:string;
  constructor(private httpCilent:HttpClient,private httpCilent1:HttpClient,private httpCilent2:HttpClient) { 
    this.url="https://localhost:5001/api/";
  }

  getAllProducts():Observable<Product[]> {
    return this.httpCilent1.get<Product[]>(this.url+"Products");
  }
  getProduct(id: any):Observable<Product> {
    return this.httpCilent1.get<Product>(this.url+"Products/"+id);
  }
  uploadItemImages(formData:FormData):Observable<ProductLinks>
  {
    return this.httpCilent1.post<ProductLinks>("https://p98onlineshop.azurewebsites.net/api/UploadItemImage",formData);
  }
  addProduct(product: Product) {
    return this.httpCilent2.post(this.url+"Products",product);
  }
  updateProduct(product: Product) {
    return this.httpCilent2.put(this.url+"Products/"+product.productId,product);
  }
}
