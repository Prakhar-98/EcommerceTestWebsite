import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:Order[]=[];
  user:User;
  constructor(private local:LocalStorageService,private orderService:OrderService,private router:Router) {
    //Get orders of the user
    this.user=this.local.retrieve('user');
    if(this.user.userRole=="User")
    {
      this.orderService.getAllOrdesFromAPI(this.user.userId).subscribe((data)=>
    {
      this.orders=data;
    });
  }
  else
  {
    this.orderService.getOrdesFromAPI().subscribe((data)=>
    {
      this.orders=data;
    });
  }
   }

  ngOnInit(): void {
  }

  viewDetails(id:number)
  {
    this.router.navigate(['profile/orderDetails/'+id])
  }

}