import { UserDatabaseService } from '../services/user-database.service';
import { Component, ElementRef, OnInit, EventEmitter, Output,ViewChild } from '@angular/core';
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
    private navigationService: NavigationService,
    private userDatabaseService: UserDatabaseService) {
  }
  @ViewChild("password") passwordInput:ElementRef;
  @ViewChild("email") emailInput:ElementRef;

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.verifyUserData();

    this.progressService.hideProgress();
    this.userDatabaseService.getUserDatabaseEmitter().subscribe((item) => this.verifyUserData());
  }

  verifyUserData() {
    if (this.userDatabaseService.getUserDatabase() && !this.userDatabaseService.getUserDatabase().isCreated) {
      $('#settingsModal').modal('toggle');
      this.progressService.hideProgress();
    }
  }

  loginGoogle() {

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((obj) => {
     

    }).catch(function (error) {
      this.messageAlertService.showErrorMessage(error.message);
    });
  }
  registerEmail() {
    this.progressService.showProgress();

    this.afAuth.auth.createUserWithEmailAndPassword(this.emailInput.nativeElement.value, this.passwordInput.nativeElement.value).then((item) => {
      this.loginEmail();
    }).catch((error) => {
      this.messageAlertService.showErrorMessage(error.message);
      this.progressService.hideProgress();
    });
  }
  loginEmail() {
    this.progressService.showProgress();

    this.afAuth.auth.signInWithEmailAndPassword(this.emailInput.nativeElement.value, this.passwordInput.nativeElement.value).then((item) => {
    
    }).catch((error) => {
      this.messageAlertService.showErrorMessage(error.message);
      this.progressService.hideProgress();
    });
  }

  changeType(password: ElementRef) {
    this.passwordInput.nativeElement.type = "text";password['type'] = password['type'] == 'text' ? 'password' : 'text';
  }
}
