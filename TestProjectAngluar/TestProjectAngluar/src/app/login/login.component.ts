import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user:User;
message:string;
inProcess:boolean;
  constructor(private lstorage:LocalStorageService,private userService:UserService,private router:Router,private snackBar: MatSnackBar) {
    this.message='';
    this.user=new User();
    this.inProcess=false;
   }

  ngOnInit(): void {
  }

login(loginForm:NgForm)
{
  if(loginForm.valid)
  {
    this.inProcess=true;
    this.userService.loginFromApi(this.user).subscribe((data)=>
    {
      this.inProcess=false;
      if(data!=null) {
        this.lstorage.store('user',data); //Store user object in localstorage for the session
        this.router.navigate(['']);//Route to homepage
       
      }
      else this.openSnackBar("Invalid username or password");
    });
  }
    else this.openSnackBar('Please Enter all the details correctly');
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
       duration: 2000,
    });
 } 
}

