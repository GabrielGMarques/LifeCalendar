import { Period } from '../shared/period.model';
import { ElementRef,Component, Input, OnInit } from '@angular/core';
import { NgModel,FormsModule } from '@angular/forms';
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth){
    this.user = this.afAuth.authState
  }

  user: Observable<firebase.User>;
  
  ngOnInit() {
  }

}
