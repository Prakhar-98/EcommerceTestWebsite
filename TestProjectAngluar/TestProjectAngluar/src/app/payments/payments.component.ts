import { PlaceOrderView } from './../models/PlaceOrderView';
import { Payment } from './../models/Payment';
import { User } from './../models/User';
import { Address } from './../models/Address';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ICustomWindow, WindowRefService } from '../window-ref.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  providers: [WindowRefService]
})
export class PaymentsComponent implements OnInit {

  @Input() Address:Address;
  @Input() amount:number;
  @Input() order_id:string;
  private _window: ICustomWindow;
  payment:Payment;
  placeOrderView:PlaceOrderView;
  user:User;
  public rzp: any;
  inProccess:boolean;

  public options: any = {
    key: 'rzp_test_lss75sHAu0xtk6', // add razorpay key here
    name: 'SHOPAHOLICS',
    description: 'Shopping',
    currency: 'INR',
    image: 'https://i.pinimg.com/280x280_RS/8b/58/51/8b58518a28c684740944934333c575e2.jpg',
    amount: 0, // razorpay takes amount in paisa
    order_id: "",
    prefill: {
      name: '',
      email: '',
      contact:""
    },
    notes: {},
    theme: {
      color: '#3880FF'
    },
    handler: this.paymentHandler.bind(this),
    modal: {
      ondismiss: (() => {
        this.zone.run(() => {
          // add current page routing if payment fails
          this.inProccess=false;
        })
      })
    }
  };
  constructor(
    private zone: NgZone,
    private winRef: WindowRefService,
    private local:LocalStorageService,private cservice:CartService,private router:Router
  ) {
    this._window = this.winRef.nativeWindow;
    this.user=this.local.retrieve('user');
    this.inProccess=false;
  }

  ngOnInit() {}

  initPay(): void {
    this.options.amount=this.amount*100;
    this.options.order_id=this.order_id;
    this.options.prefill.name=this.user.userName;
    this.options.prefill.email=this.user.userEmail;
    this.options.prefill.contact=this.user.userPhone;
    this.rzp = new this.winRef.nativeWindow['Razorpay'](this.options);
    this.inProccess=true;
    this.rzp.open();
  }

  paymentHandler(response, error) {
    this.zone.run(() => {
      this.payment=new Payment();
      this.payment.razorpay_order_id=response.razorpay_order_id;
      this.payment.razorpay_payment_id=response.razorpay_payment_id;
      this.payment.razorpay_signature=response.razorpay_signature;
      this.placeOrderView=new PlaceOrderView();
      this.placeOrderView.address=this.Address;
      this.placeOrderView.payment=this.payment;
      console.log(this.placeOrderView);
      this.cservice.checkoutFromCart(this.user.userId,this.placeOrderView).subscribe(data=>{
    this.router.navigate(['/confirmOrder']);
    this.inProccess=false;
  });
    });
  }

}