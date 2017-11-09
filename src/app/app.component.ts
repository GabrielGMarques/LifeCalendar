import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from './shared/user.model';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  tabSelected: { id: Number, name: string, selected: true };

  @ViewChild('WarningMessageComponent') warningMessageComponent;
  @ViewChild('AppWeeklyList') appWeeklyList;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.userAuth = this.afAuth.authState
  }


  userDatabaseObservable: FirebaseListObservable<User[]>;
  userDatabase: User;
  userAuth: Observable<firebase.User>
  userAuthObj: firebase.User = null;
  userVerified = false;
  progressIconShown = true;

  ngOnInit() {
    this.updateUserAuth();
  }

  updateUserAuth() {
    this.userAuth.forEach(item => {
      
      this.userAuthObj = item;
      this.progressIconShown = false;

      if (item) {
        this.updateUserDatabase();

      }
      
    });
  }

   updatePeriodFilter(level:number){

     this.appWeeklyList.updatePeriodFilter(level);
  }
  

  updateUserDatabase() {
    this.userDatabaseObservable = this.db.list('users_' + this.userAuthObj.uid + "/");

    this.userDatabaseObservable.forEach((item) => {
      this.showProgressIcon();

      this.userDatabase = null;

      item.forEach((item) => {
        this.userDatabase = item;
        this.verifyUserData(item);

      });
      this.verifyUserData(this.userDatabase);

      this.hideProgressIcon();
    });
  }
  verifyUserData(item) {
    if (!item) {
      this.userVerified = false;
      $('#settingsModal').modal('toggle');
    } else {
      this.userVerified = true;
    }
  }
  

  showProgressIcon() {
    this.progressIconShown = true;
  }
  hideProgressIcon() {
    this.progressIconShown = false;
  }
  logout() {
    this.afAuth.auth.signOut();
    location.reload();
  }
  selectTab(event) {
    this.tabSelected = event;
  }

  showErrorMessage(message: string) {
    this.warningMessageComponent.showErrorMessage(message);
  }

  showSuccessMessage(message: string) {
    this.warningMessageComponent.showSuccessMessage(message);
  }

}
