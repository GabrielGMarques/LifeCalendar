import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { User } from '../shared/user.model';
declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.userAuth = this.afAuth.authState
  }
  userDatabaseObservable: FirebaseListObservable<User[]>;
  userAuth: Observable<firebase.User>;
  userAuthObj: firebase.User = null;
  userDatabase: User;
  @Output() hideProgressEmitter = new EventEmitter<{}>();
  @Output() showProgressEmitter = new EventEmitter<{}>();
  ngOnInit() {
    this.updateUserAuth();
  }

  updateUserAuth() {

    // this.showProgressEmitter.emit()
    this.userAuth.forEach(item => {
      this.userAuthObj = item;

      if (item) {
        this.updateUserDatabase();
      }
    });
  }

  updateUserDatabase() {
    this.showProgressEmitter.emit()
    this.userDatabaseObservable = this.db.list('users_' + this.userAuthObj.uid + "/");

    this.userDatabaseObservable.forEach((item) => {

      this.userDatabase = null;

      item.forEach((item) => {
        this.userDatabase = item;
      });
      this.hideProgressEmitter.emit()

    });
  }
  ngAfterViewInit() {
    $('[data-toggle="datepicker"]').datepicker();

  }

  saveData(birthDate: string, finalAge: number, name: string) {
    var user = new User();
    var birthDateParsed = new Date(birthDate);
    user.yearBirth = birthDateParsed.getFullYear();
    user.monthBirth = birthDateParsed.getMonth();
    user.dayBirth = birthDateParsed.getDate();
    user.name = name;
    user.ageOfDeath = finalAge;

    if (birthDate && finalAge && name) {
      this.userDatabaseObservable.push(user);
      $('#settingsModal').modal('toggle');

    }else{
      console.log(user);
    }
  }


}
