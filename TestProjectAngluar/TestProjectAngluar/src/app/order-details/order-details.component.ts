import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from '../models/OrderDetails';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  
  orderDetails:OrderDetails[]=[];
  constructor(private orderDetailsService:OrderService,private aroute:ActivatedRoute) { 
    var orderId=this.aroute.snapshot.params.id;
    this.orderDetailsService.getOrderDetailsFromApi(orderId).subscribe(o=>
      {
        this.orderDetails=o;
      })
  }

  ngOnInit(): void {
  }

}