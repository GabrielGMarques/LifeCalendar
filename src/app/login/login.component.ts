import { Component, ElementRef, OnInit,EventEmitter,Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {ProgressService} from '../services/progress.service'
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,private progressService:ProgressService){
  }

  @Output() errorEmmiter = new EventEmitter<string>();
  @Output() successEmmiter = new EventEmitter<string>();

  ngOnInit() {
    
  }

  showProgressIcon() {
    this.progressService.showProgress();
  }
  hideProgressIcon() {
    this.progressService.hideProgress();
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(function (error){
      alert( error.message + ' Please try again')
    })
  }
  registerEmail(email,password){
     this.afAuth.auth.createUserWithEmailAndPassword(email,password).then((item)=>{
       this.loginEmail(email,password);
     }).catch((error)=>{
       this.errorEmmiter.emit(error.message);
    });
  }
  loginEmail(email,password){
     this.afAuth.auth.signInWithEmailAndPassword(email,password).then((item)=>{
     }).catch((error)=>{
       this.errorEmmiter.emit(error.message);
    });
  }
  
  changeType(password:ElementRef){
    // password.nativeElement.type = "text";
     password['type'] = password['type'] == 'text'?'password':'text';
  }
}
