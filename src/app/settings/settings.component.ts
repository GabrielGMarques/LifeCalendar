import { Component, EventEmitter, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { ProgressService } from '../services/progress.service'

import { User } from '../shared/user.model';
declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private progressService: ProgressService) {
    this.userAuth = this.afAuth.authState
  }

  userDatabaseObservable: FirebaseListObservable<User[]>;
  userAuth: Observable<firebase.User>;
  userAuthObj: firebase.User = null;
  userDatabase: User;

  @ViewChild('dateFromInput') dateFromInput;
  @ViewChild('lastAgeInput') lastAgeInput;
  @ViewChild('userNameInput') userNameInput;
  ngOnInit() {

  }

  updateUserAuth() {

    this.userAuth.forEach(item => {
      this.userAuthObj = item;

      if (item) {
        this.updateUserDatabase();
      }
    });
  }

  updateUserDatabase() {
    this.progressService.showProgress();
    this.userDatabaseObservable = this.db.list('users_' + this.userAuthObj.uid + "/");

    this.userDatabaseObservable.forEach((item) => {

      this.userDatabase = null;

      item.forEach((item) => {
        this.userDatabase = item;
      });

      if (this.userDatabase) {
        this.dateFromInput.nativeElement.value = (this.userDatabase.monthBirth + 1) + "/" + this.userDatabase.dayBirth + "/" + this.userDatabase.yearBirth;
        this.lastAgeInput.nativeElement.value = this.userDatabase.ageOfDeath;
        this.userNameInput.nativeElement.value = this.userDatabase.name;
      }
      this.progressService.hideProgress();

    });
  }
  ngAfterViewInit() {
    $('[data-toggle="datepicker"]').datepicker();
    this.updateUserAuth();
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
      setInterval(() => { location.reload(); }, 500);
    }
  }


}
