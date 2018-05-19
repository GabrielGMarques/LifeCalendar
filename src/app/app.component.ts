import { UtilService } from './services/util.service';
import { PeriodService } from './services/period.service';
import { UserDatabaseService } from './services/user-database.service';
import { PeriodFilterService } from './services/period-filter.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from './shared/user.model';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { ProgressService } from './services/progress.service';
import { MessageAlertService } from './services/message-alert.service';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    ProgressService,
    MessageAlertService,
    PeriodFilterService,
    UserDatabaseService,
    PeriodService,
    NavigationService,
    UtilService
  ]
})
export class AppComponent implements OnInit {

  constructor(
    private progressService: ProgressService,
    private messageAlertService: MessageAlertService,
    private periodFilterService: PeriodFilterService,
    private userDatabaseService: UserDatabaseService,
    private periodService: PeriodService,
    private navigationService: NavigationService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.userDatabaseService.getUserDatabaseEmitter().subscribe((item: User) => { this.verifyUserData(item); });
    this.verifyUserData(this.userDatabaseService.getUserDatabase());
  }

  verifyUserData(item: User) {
    this.progressService.showProgress();
    if (!item) {
      if (this.userDatabaseService.isDatabaseCreated()) {
        this.navigationService.navigateToProgress();
      } else {
        this.navigationService.navigateToLogin();
      }
    } else if (item.isCreated) {
      this.navigationService.navigateToHome();
    } else {
      this.navigationService.navigateToLogin();
    }
  }
}
