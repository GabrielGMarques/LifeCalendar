import { UserDatabaseService } from './user-database.service';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from '../shared/user.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Period } from '../shared/period.model';

@Injectable()
export class PeriodService {
    private periodEmitter = new EventEmitter<Period[]>();
    private periodsObservable: FirebaseListObservable<Period[]>;
    private periods: Period[] = [];
    userDatabase: User;

    constructor(private db: AngularFireDatabase, private userDatabaseService: UserDatabaseService) {
        userDatabaseService.getUserAuthEmitter().subscribe((item: firebase.User) => {
            this.getPeriodsData(item);
        });
    }
    getPeriodEmitter() {
        return this.periodEmitter;
    }
    getPeriods() {
        return this.periods;
    }
    savePeriod(value: any) {
        this.periodsObservable.push(value);
    }
    deletePeriod(key: string) {
        this.periodsObservable.remove(key);
    }

    updatePeriod(key: string, value: any) {
        this.periodsObservable.update(key, value);
    }

    getPeriodsData(user: firebase.User) {
        if (user) {
            this.periodsObservable = this.db.list('periods_user_' + user.uid + "/");

            this.periodsObservable.forEach((item) => {
                this.periods = item;
                this.periodEmitter.emit(item);
            });
        }
    }


}