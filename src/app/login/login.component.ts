import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth){
    this.user = this.afAuth.authState
  }
  user: Observable<firebase.User>

  ngOnInit() {
  }
  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(function (error){
      alert( error.message + ' Please try again')
    })
  }
  registerEmail(email,password){
     this.afAuth.auth.createUserWithEmailAndPassword(email,password).catch(function (error){
      alert( error.message + ' Please try again')
    });
  }
  loginEmail(email,password){
     this.afAuth.auth.signInWithEmailAndPassword(email,password).catch(function (error){
      alert( error.message + ' Please try again')
    });
  }
  logout(){
    this.afAuth.auth.signOut();
  }
  changeType(password:ElementRef){
    // password.nativeElement.type = "text";
     password['type'] = password['type'] == 'text'?'password':'text';
  }
}
