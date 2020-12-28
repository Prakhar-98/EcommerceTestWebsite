import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardService implements CanActivate{

  constructor(private local:LocalStorageService,private router:Router) { }

  canActivate():boolean
  {
    if(this.local.retrieve('user')!=null) return true;
    this.router.navigate(['**']);
     return false;
  }
}

