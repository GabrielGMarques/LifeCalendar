import { UserDatabaseService } from '../services/user-database.service';
import { Component, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProgressService } from '../services/progress.service'
import { MessageAlertService } from '../services/message-alert.service'
import { NavigationService } from '../services/navigation.service'

declare var $: any;

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,
  private progressService: ProgressService,
  private messageAlertService: MessageAlertService,
  private navigationService:NavigationService,
  private userDatabaseService:UserDatabaseService) {
  }
  
  ngOnInit() {
  
  }

  ngAfterViewInit() {
    this.verifyUserData();
    this.userDatabaseService.getUserDatabaseEmitter().subscribe((item)=>this.verifyUserData());
  } 

  verifyUserData(){
    console.log(this.userDatabaseService.getUserDatabase());
    if(this.userDatabaseService.getUserDatabase() && !this.userDatabaseService.getUserDatabase().isCreated){
      $('#settingsModal').modal('toggle');
    }
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((obj)=>{
      var observable = this.userDatabaseService.getSingleObj();
      
      observable.forEach(item=>{
          if(!item.$exists()){
            this.userDatabaseService.saveUser({isCreated:false});
          }
      });

    }).catch(function (error) {
        this.messageAlertService.showErrorMessage(error.message);
      })
  }
  registerEmail(email, password) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((item) => {
      this.loginEmail(email, password);
    }).catch((error) => {
      this.messageAlertService.showErrorMessage(error.message);
    });
  }
  loginEmail(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then((item) => {
      var observable = this.userDatabaseService.getSingleObj();
      
      observable.forEach(item=>{
          if(!item.$exists()){
            this.userDatabaseService.saveUser({isCreated:false});
          }
      });
    }).catch((error) => {
      this.messageAlertService.showErrorMessage(error.message);
    });
  }

  changeType(password: ElementRef) {
    // password.nativeElement.type = "text";password['type'] = password['type'] == 'text' ? 'password' : 'text';
  }
}
