import { Component, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProgressService } from '../services/progress.service'
import { MessageAlertService } from '../services/message-alert.service'
import { NavigationService } from '../services/navigation.service'

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
  private navigationService:NavigationService) {
  }
  
  ngOnInit() {
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((obj)=>{
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
    }).catch((error) => {
      this.messageAlertService.showErrorMessage(error.message);
    });
  }

  changeType(password: ElementRef) {
    // password.nativeElement.type = "text";password['type'] = password['type'] == 'text' ? 'password' : 'text';
  }
}
