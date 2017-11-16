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

declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProgressService, MessageAlertService,PeriodFilterService,UserDatabaseService,PeriodService]
})
export class AppComponent implements OnInit {
  title = 'app';
  tabSelected: { id: Number, name: string, selected: true };


  constructor(
    private progressService: ProgressService,
    private messageAlertService: MessageAlertService,
    private periodFilterService: PeriodFilterService,
    private userDatabaseService: UserDatabaseService,
    private periodService: PeriodService){}
    
  userVerified = false;
  progressIconShown = false;

  ngOnInit() {

    this.verifyUserData(this.userDatabaseService.getUserDatabase());

    this.userDatabaseService.getUserDatabaseEmitter().subscribe((item:User)=>{
      if(item)
        this.verifyUserData(item);
    })
    
    this.progressService.getProgressEmitter().subscribe((event: boolean) => this.progressIconShown = event);

  }

  verifyUserData(item) {
    if (!item) {
      this.userVerified = false;
      $('#settingsModal').modal('toggle');
    } else {
      this.userVerified = true;
    }
  }
}
