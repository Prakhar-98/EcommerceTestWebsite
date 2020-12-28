import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { OtpService } from '../services/otp.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  otpSent:boolean;
  otp:number;
  userotp:number;
  user:User;
  message:string;
  cPassword:string;
  constructor(private otpService:OtpService,private userService:UserService,private router:Router,private snackBar:MatSnackBar) {
    this.otpSent=false;
    this.message="";
    this.user=new User();
   }

  ngOnInit(): void {
  }

  sendOtp()//Returns 0 if email not registered and OTP if registered
  {
    this.otpService.getOtpfromApi(this.user.userEmail).subscribe((data)=>
    {
      this.otp=data;
      if(this.otp!=0)
      {
      this.otpSent=true; //OTP is sent successfully on registered email id
      }
    else
     {
      this.message="Email does not exsist";
      }
    });
    
  }
  resendOtp()
  {
    this.otpService.resendOtpfromApi(this.user.userEmail,this.otp).subscribe((data)=>
    {
    })
    this.openSnackBar("Otp sent again");
  }
  changePassword(fp:NgForm)
  {
    if(fp.invalid)
    {
      this.openSnackBar('Please enter all the details correctly');
    }
    else
    {
      if(this.user.userPassword!=this.cPassword)
      {
        this.openSnackBar('Password Mismatch');
      }
      else if(this.otp==this.userotp)//Check if OTP sent is same as OTP entered by user
      {
      this.userService.changePasswordFromApi(this.user).subscribe((data)=>{
        if(data!=null)
        this.router.navigate(['login']);
        else this.openSnackBar("Email not in records signUp");
      });
    }
      else
      {
        this.openSnackBar("Invalid Otp");
      }
  }
}
openSnackBar(message: string) {
  this.snackBar.open(message, "Ok", {
     duration: 2000,
  });
} 
}
