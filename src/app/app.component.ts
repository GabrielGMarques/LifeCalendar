import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from './shared/user.model';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { ProgressService } from './services/progress.service';
import { MessageAlertService } from './services/message-alert.service';

declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProgressService, MessageAlertService]
})
export class AppComponent implements OnInit {
  title = 'app';
  tabSelected: { id: Number, name: string, selected: true };

  @ViewChild('WarningMessageComponent') warningMessageComponent;
  @ViewChild('AppWeeklyList') appWeeklyList;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, private progressService: ProgressService, private messageAlertService: MessageAlertService) {
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
    this.progressService.getProgressEmitter().subscribe((event: boolean) => this.progressIconShown = event);
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

  updatePeriodFilter(level: number) {

    this.appWeeklyList.updatePeriodFilter(level);
  }


  updateUserDatabase() {
    this.userDatabaseObservable = this.db.list('users_' + this.userAuthObj.uid + "/");

    this.userDatabaseObservable.forEach((item) => {
      this.progressService.showProgress();

      this.userDatabase = null;

      item.forEach((item) => {
        this.userDatabase = item;
        this.verifyUserData(item);

      });
      this.verifyUserData(this.userDatabase);

      this.progressService.hideProgress();
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


  logout() {
    this.afAuth.auth.signOut();
    location.reload();
  }
  selectTab(event) {
    this.tabSelected = event;
  }

  
}
