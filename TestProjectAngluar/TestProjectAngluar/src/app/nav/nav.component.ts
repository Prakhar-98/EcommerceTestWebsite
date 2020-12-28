import { Component, DoCheck, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from '../models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit,DoCheck {

  user:User;
  constructor(private router:Router,private localStorage:LocalStorageService,private snackBar:MatSnackBar) {
    this.user=null;
   }

  ngOnInit(): void {
  }
  ngDoCheck()
  {
    this.user=this.localStorage.retrieve('user');
  }
  signOut()
  {
    this.localStorage.clear('user');
    this.openSnackBar('Sign Out Successful');
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
       duration: 2000,
    });
 } 

}
