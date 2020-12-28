import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user:User;
  message:string;
  cpassword:string;
  inProcess:boolean;
  constructor(private userService:UserService,private router:Router,private snackBar:MatSnackBar) { 
    this.user=new User();
    this.inProcess=false;
  }

  ngOnInit(): void {
  }
  registerUser(signUp:NgForm)
  {
    if(signUp.valid)
    {if(this.cpassword!=this.user.userPassword)
    {
      this.openSnackBar('Passwords do not match');
    }
    else 
    {
    this.inProcess=true;
    this.userService.signUpFromApi(this.user).subscribe((data)=>
    {
      this.inProcess=false;
      console.log(data);
      if(data!=null)this.router.navigate(['/login']);
      else this.openSnackBar("Email or phone already exsists.Please LogIn");
    });
  }
  }
  else
  {
    this.openSnackBar('Please enter all details correctly');
  }

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
       duration: 2000,
    });
 } 
}

