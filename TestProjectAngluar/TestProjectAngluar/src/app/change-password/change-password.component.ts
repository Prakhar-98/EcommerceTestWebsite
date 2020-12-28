import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  currentPassword:string;
  newPassword:string;
  user:User;
  message:string;
  confirmPassword:string;
  inProcess:boolean;
  constructor(private local:LocalStorageService,private userService:UserService,private router:Router) { 
    this.user=this.local.retrieve('user');
    this.message='';
    this.inProcess=false;
  }

  ngOnInit(): void {
  }
  changePassword(form:NgForm)
  {
    if(form.valid && this.newPassword==this.confirmPassword)
    {
      if(this.currentPassword!=this.user.userPassword)this.message='Current Password is wrong';
      else
      {
        this.inProcess=true;
        this.userService.updateFromApi(this.user).subscribe((data)=>{
          this.local.store('user',this.user); //Update the localstorage with new values
          this.user.userPassword=this.newPassword;
          form.reset();
          this.message='Updated Successfully'
          this.inProcess=false;
      });
      }
    }
    else
    {
      this.message='Please enter all values correctly'
    }

  }
}
