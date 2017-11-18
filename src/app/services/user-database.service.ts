import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from '../shared/user.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class UserDatabaseService {
    private userAuthEmitter = new EventEmitter<firebase.User>();
    private userDatabaseEmitter = new EventEmitter<User>();
    private userAuthObservableEmitter = new EventEmitter<Observable<firebase.User>>();
    private userDatabaseObservable: FirebaseListObservable<User[]>;
    // private userAuthObservableEmitter = new EventEmitter< Period[]>();

    private userDatabase: User;
    // userAuth: Observable<firebase.User>
    userFirebase: firebase.User = null;

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase ) {
        this.afAuth.authState.forEach(item => {
            if (item){
                this.userFirebase = item;
                this.userAuthEmitter.emit(item);
                this.updateUserDatabase(item);
            }
        });
    }
    updateUserDatabase(obj: firebase.User) {
        
        this.userDatabaseObservable = this.db.list('users_' + obj.uid + "/");
        
        this.userDatabaseObservable.forEach((item) => {
            
            var userDatabase: User;
            item.forEach((user: User) => {
                userDatabase = user;
            });
            if (userDatabase) {
                this.userDatabase = userDatabase;
                this.userDatabaseEmitter.emit(userDatabase);
            }
        });
    }
    getSingleObj(){
        return this.db.object('users_' +  this.userFirebase.uid + "/");
    }
    getUserFirebase(){
        return this.userFirebase;
    }
    getUserDatabase(){
        return this.userDatabase;
    }

    getUserAuthEmitter() {
        return this.userAuthEmitter;
    }
    getUserDatabaseEmitter() {
        return this.userDatabaseEmitter;
    }
    saveUser(value:any){
        this.userDatabaseObservable.push(value);
    }
    deleteUser(key:string){
        this.userDatabaseObservable.remove(key);
    }

    updateUser(key:string,value:any){
        this.userDatabaseObservable.update(key,value);
    }

}