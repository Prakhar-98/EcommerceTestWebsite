import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {

  user:User;
  message:string;
  inProcess:boolean;
  constructor(private local:LocalStorageService,private userService:UserService,private router:Router,private snackBar:MatSnackBar) {
    this.user=this.local.retrieve('user');
    this.message="";
    this.inProcess=false;
   }

  ngOnInit(): void {
  }
   //Returns true if user details updated successfully else false
  update()
  {
    this.userService.updateFromApi(this.user).subscribe((data)=>
    {
      this.inProcess=true;
      if(data)
      {
        this.inProcess=false;
        this.openSnackBar("Updated Succesfully");
        this.local.store('user',this.user);
      }
      else this.openSnackBar("Email or phone is already tied to a account");
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
       duration: 2000,
    });
 } 
}