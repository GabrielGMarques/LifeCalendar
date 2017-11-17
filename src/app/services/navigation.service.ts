import { Consts } from '../shared/consts.model'
import { Router } from '@angular/router';
import { Injectable,EventEmitter } from '@angular/core';

const consts:Consts = new Consts();


@Injectable()
export class NavigationService{
  constructor( private route:Router){}
  navigateToHome(){
      this.route.navigate([`/${consts.homePath}`])
  }
  navigateToLogin(){
      this.route.navigate([`/${consts.loginPath}`])
  }
}