import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from '../models/User';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  user:User;
  constructor(private local:LocalStorageService) {
    this.user=this.local.retrieve('user');
   }


  ngOnInit(): void {
  }

}
