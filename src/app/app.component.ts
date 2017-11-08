import { Component,ViewChild,OnInit } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'app';
  tabSelected:{id:Number,name:string,selected:true};
  
  @ViewChild('WarningMessageComponent') child;

  constructor(public afAuth: AngularFireAuth){
    this.user = this.afAuth.authState
  }

  user: Observable<firebase.User>
  userObj:firebase.User = null;
  userVerified = false;
  progressIconShown = true;

  ngOnInit() {
    this.user.forEach(item=>{
      this.userObj = item;
      this.userVerified = true;
      this.hideProgressIcon();
    });
    
  }

  showProgressIcon(){
    this.progressIconShown = true;
  } 
  hideProgressIcon(){
    this.progressIconShown = false;
  }
  logout(){
    this.afAuth.auth.signOut();
  }
  selectTab(event){
    this.tabSelected = event;
  }
  
  showErrorMessage(message:string){
    this.child.showErrorMessage(message);
  }

  showSuccessMessage(message:string){
    this.child.showSuccessMessage(message);
  }

}
