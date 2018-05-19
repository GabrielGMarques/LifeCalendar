import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ViewChild } from '@angular/core';
import { MessageAlertService } from '../services/message-alert.service';
import { UtilService } from '../services/util.service';
import { PeriodService } from '../services/period.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Period } from '../shared/period.model';
import { timeout } from 'q';
import { Observable } from 'rxjs';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-period-activity',
  templateUrl: './period-activity.component.html',
  styleUrls: ['./period-activity.component.css']
})
export class PeriodActivityComponent implements OnInit {

  @Output("onCloseModalEvent") private onCloseModalEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() periods: Period[];
  timeLapses: { date: { days: string, hours: string, minutes: string, seconds: string }, period: Period }[];

  constructor(private db: AngularFireDatabase,
    private messageAlertService: MessageAlertService,
    private periodService: PeriodService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.timeLapses = this.periods.sort((period1, period2) => period1.dateToLong - period2.dateToLong).map(period => { return { date: this.utilService.getTimeLeft(period.dateToLong), period: period } });

    Observable.interval(1000)
      .takeWhile(() => true)
      .subscribe(i => {
        this.timeLapses.forEach(x => {
          x.date = this.utilService.getTimeLeft(x.period.dateToLong);
        });
      });
  }

  @ViewChild("taskDescription") taskDescription: ElementRef;

  saveTask(period: Period, task: Task) {
    if (task.inEdition) {
      task.inEdition = false;
      task.description = this.taskDescription.nativeElement.value;
    } else {
      task.completed = !task.completed;
    }

    this.utilService.calcPeriodProgress(period);
    this.periodService.updatePeriod(period.$key, period);
  }

  setTaskComplexity(period: Period, task: Task, complexity: number) {
    task.complexity = complexity;
    this.utilService.calcPeriodProgress(period);
    this.periodService.updatePeriod(period.$key, period);
  }

  editTask(period: Period, task: Task) {
    task.inEdition = true;
    task.hadBeenEditedOnce = true;
    this.periodService.updatePeriod(period.$key, period);
  }

  removeTask(period: Period, task: Task) {
    if (task.hadBeenEditedOnce && task.inEdition) {
      task.inEdition = false;
    } else {
      period.tasks = period.tasks.filter(x => x != task);
    }

    this.utilService.calcPeriodProgress(period);
    this.periodService.updatePeriod(period.$key, period);
  }

  addTask(period: Period) {
    if (!period.tasks)
      period.tasks = [];

    period.tasks.push({ inEdition: true });
    this.periodService.updatePeriod(period.$key, period);
  }
}
