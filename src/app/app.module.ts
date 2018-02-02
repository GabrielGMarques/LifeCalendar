import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { WeeklyListComponent } from './weekly-list/weekly-list.component';
import { DayListComponent } from './day-list/day-list.component';
// import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { PeriodEditComponent } from './period-edit/period-edit.component';
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { WarningMessageComponent } from './warning-message/warning-message.component';
import { ProgressIconComponent } from './progress-icon/progress-icon.component';
import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeekTooltipComponent } from './week-tooltip/week-tooltip.component'
// import { ProgressService } from './services/progress.service';

export const environment = {
  production: false,
  firebase: {
    apiKey: "{{YOUR_KEY}}",
    authDomain: "lifecalendar-8386b.firebaseapp.com",
    databaseURL: "https://lifecalendar-8386b.firebaseio.com",
    projectId: "lifecalendar-8386b",
    storageBucket: "lifecalendar-8386b.appspot.com",
    messagingSenderId: "962523285641"
  }
};

const appRoutes:Routes =[
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'loading',component:ProgressIconComponent}
]



@NgModule({
  declarations: [
    AppComponent,
    WeeklyListComponent,
    DayListComponent,
    PeriodEditComponent,
    HeaderNavbarComponent,
    LoginComponent,
    SettingsComponent,
    WarningMessageComponent,
    ProgressIconComponent,
    HomeComponent,
    WeekTooltipComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
	  AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
