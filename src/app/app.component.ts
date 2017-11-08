import { Component,ViewChild,OnInit } from '@angular/core';
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
export class AppComponent  implements OnInit{
  title = 'app';
  tabSelected:{id:Number,name:string,selected:true};
  
  @ViewChild('WarningMessageComponent') child;

  constructor(public afAuth: AngularFireAuth,public db: AngularFireDatabase){
    this.userAuth = this.afAuth.authState
  }
  userDatabaseObservable: FirebaseListObservable<User[]>;
  userDatabase: User;
  userAuth: Observable<firebase.User>
  userAuthObj:firebase.User = null;
  userVerified = false;
  progressIconShown = true;

  ngOnInit() {
    this.updateUserAuth();
  }

  updateUserAuth(){
    this.userAuth.forEach(item=>{
      this.userAuthObj = item;
      this.progressIconShown = false;
      this.updateUserDatabase();
    });
  }
  updateUserDatabase(){
    this.userDatabaseObservable = this.db.list('users_'+this.userAuthObj.uid+"/");
    
    this.userDatabaseObservable.forEach((item) => {
      
      this.userDatabase = null;
      
      item.forEach((item) => {
        console.log(item);
        this.userDatabase = item;
      
        if(!item){
          console.log('lalal');
          this.userVerified = false;
            $('settingsModal').show();
        }else{
          this.userVerified = true;  
        }
      });
      if(!this.userDatabase){
        console.log('lalal');
        this.userVerified = false;
          $('settingsModal').show();
      }else{
        this.userVerified = true;  
      }
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
