import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from '../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User;
  constructor(private localStorage:LocalStorageService) { 
    this.user=this.localStorage.retrieve('user');
  }

  ngOnInit(): void {
  }

  signOut()
  {
    this.localStorage.clear('user');

  }
}