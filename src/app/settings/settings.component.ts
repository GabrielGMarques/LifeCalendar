import { UserDatabaseService } from '../services/user-database.service';
import { UtilService } from '../services/util.service';
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

  constructor(
    private db: AngularFireDatabase,
    private progressService: ProgressService,
    private utilService: UtilService,
    private userDatabaseService: UserDatabaseService) {
  }

  userAuthObj: firebase.User = null;
  userDatabase: User;

  @ViewChild('dateFromInput') dateFromInput;
  @ViewChild('lastAgeInput') lastAgeInput;
  @ViewChild('userNameInput') userNameInput;

  ngOnInit() {
    this.userAuthObj = this.userDatabaseService.getUserFirebase();
    this.userDatabase = this.userDatabaseService.getUserDatabase();
  }

  
  ngAfterViewInit() {
    $('[data-toggle="datepicker"]').datepicker({ dateFormat: "dd/mm/yy" });
    if (this.userDatabase && this.userDatabase.isCreated) {
    
      this.dateFromInput.nativeElement.value = this.utilService.formatDate(new Date(this.userDatabase.yearBirth, this.userDatabase.monthBirth-1, this.userDatabase.dayBirth))
      this.lastAgeInput.nativeElement.value = this.userDatabase.ageOfDeath;
      this.userNameInput.nativeElement.value = this.userDatabase.name;
    }
  }

  saveData(birthDate: string, finalAge: number, name: string) {

    var birthDateParsed = this.utilService.parseDate(birthDate);

    var user = {
      yearBirth: birthDateParsed.getFullYear(),
      monthBirth: birthDateParsed.getMonth(),
      dayBirth: birthDateParsed.getDate(),
      name: name,
      ageOfDeath: finalAge,
      isCreated:true
    }

    if (birthDate && finalAge && name) {
      if (this.userDatabase) {
        this.userDatabaseService.updateUser(this.userDatabase.$key,user);
      }else{
        this.userDatabaseService.saveUser(user)
      }
      $('#settingsModal').modal('toggle');
    }
  }
}
