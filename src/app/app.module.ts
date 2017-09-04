import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { WeeklyListComponent } from './weekly-list/weekly-list.component';
import { DayListComponent } from './day-list/day-list.component';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDFtLShrrQcxwaHVvodxU-rEaEm_Kshr_E",
    authDomain: "lifecalendar-8386b.firebaseapp.com",
    databaseURL: "https://lifecalendar-8386b.firebaseio.com",
    projectId: "lifecalendar-8386b",
    storageBucket: "lifecalendar-8386b.appspot.com",
    messagingSenderId: "962523285641"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    WeeklyListComponent,
    DayListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
	  AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
