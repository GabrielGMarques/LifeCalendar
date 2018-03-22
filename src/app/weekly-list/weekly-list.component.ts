import { UtilService } from '../services/util.service';
import { PeriodService } from '../services/period.service';
import { UserDatabaseService } from '../services/user-database.service';
import { PeriodFilterService } from '../services/period-filter.service';
import { Week } from '../shared/week.model';
import { Year } from '../shared/year.model';
import { Period } from '../shared/period.model';
import { User } from '../shared/user.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ProgressService } from '../services/progress.service'
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase/app';

declare var $: any;
const now = new Date();

@Component({
  selector: 'app-weekly-list',
  templateUrl: './weekly-list.component.html',
  styleUrls: ['./weekly-list.component.css'],

})

export class WeeklyListComponent implements OnInit {

  date: { year: number, month: number };
  rangeDateStart;
  rangeDateEnd = "";
  rangeColor;
  rangeNivel;
  currentPeriodLevel = 5;
  periods: Period[] = [];
  years: Year[] = [];
  weekBuilt = false;


  constructor(public db: AngularFireDatabase,
    private progressService: ProgressService,
    private periodFilterService: PeriodFilterService,
    private userDatabaseService: UserDatabaseService,
    private periodService: PeriodService,
    private utilService: UtilService,
    private modalService: NgbModal) { }

  private ngbModalRef: NgbModalRef;

  ngOnInit() {


    var userDatabase = this.userDatabaseService.getUserDatabase();

    if (userDatabase) {
      this.buildWeeks(userDatabase);
      this.weekBuilt = true;
    }
    this.periods = this.periodService.getPeriods();

    if (this.periods) {
      this.updatePeriods();
    }
    this.periodService.getPeriodEmitter().subscribe((periods: Period[]) => {

      this.progressService.showProgress();
      this.periods = periods;
      this.updatePeriods();

      this.progressService.hideProgress();
    });

    this.userDatabaseService.getUserDatabaseEmitter().subscribe((user) => {
      this.buildWeeks(user);
      this.updatePeriodFilter(this.currentPeriodLevel);
      this.weekBuilt = true;
    });

    this.periodFilterService.getFilterEmitter().subscribe((level: number) => {
      this.updatePeriodFilter(level);
    });
  }


  ngAfterViewInit() {
    this.progressService.hideProgress();

    ($('.currentWeek')[0]).scrollIntoView('100');
    var offset = ($('.currentWeek')).offset();
    offset.top -= 100;
    $('html, body').animate({
      scrollTop: offset.top,
    }, 1000);

    $('.tooltip-inner').css("maxWidth", "none");
  }
  ngAfterViewChecked() {

    $('.tooltip>.arrow').addClass("tooltip-arrow");
    $('.tooltip-inner').css({ "maxWidth": "none", "padding": "3px 8px", "border": "#222 solid 1px", "text-align": "center", "backgroundColor": "#fff", "color": "#222" });
  }

  openModal(content) {
    this.ngbModalRef = this.modalService.open(content);
    $('.tooltip.show').toggle();
  }

  closeModal() {
    this.ngbModalRef.close();
  }

  updatePeriods() {

    this.progressService.showProgress();
    this.years.forEach((year) => {
      year.weeks.forEach((week) => {

        week.colors = [];
        week.periods = [];

        var dateFrom = new Date(week.dateFrom);
        var dateTo = new Date(week.dateTo);

        var periodsWeek = this.periods.filter(period =>
          period.dateToLong >= dateFrom.getTime() &&
          period.dateFromLong <= dateTo.getTime() &&
          (period.level == this.currentPeriodLevel || this.currentPeriodLevel == 5))
          .sort((period1, period2) => period1.dateToLong - period2.dateToLong)
          .map(item => {
            item.dateFromSt = this.utilService.formatDate(new Date(item.dateFromLong));
            item.dateToSt = this.utilService.formatDate(new Date(item.dateToLong));
            return item;
          });

        week.periods = periodsWeek;

        while (dateFrom <= dateTo) {
          var periods = periodsWeek.filter(period =>
            period.dateToLong >= dateFrom.getTime() &&
            period.dateFromLong <= dateTo.getTime())
            .sort((period1, period2) => period1.dateToLong - period2.dateToLong);

          if (periods.length) {
            week.colors.push(periods[0].color);
          } else {
            week.colors.push("#ffffff");
          }
          dateFrom.setDate(dateFrom.getDate() + 1);
        }


      });
    });
  }

  updatePeriodFilter(level: number) {
    this.currentPeriodLevel = level;
    this.progressService.showProgress();
    this.updatePeriods();
    this.progressService.hideProgress();
  }

  buildWeeks(userDatabase: User) {
    var dateBegin = new Date(userDatabase.yearBirth, userDatabase.monthBirth - 1, userDatabase.dayBirth);
    var dateEnd = new Date(userDatabase.yearBirth + userDatabase.ageOfDeath - 1, userDatabase.monthBirth, userDatabase.dayBirth);
    this.years = [];
    var indexYear = 0;

    for (var i = 0; i <= userDatabase.ageOfDeath; i++) {
      var dateFinalYear = new Date(userDatabase.yearBirth + (i + 1), userDatabase.monthBirth - 1, userDatabase.dayBirth);
      var dateInitialYear = new Date(userDatabase.yearBirth + i, userDatabase.monthBirth - 1, userDatabase.dayBirth);
      var weeks: Week[] = [];
      var indexWeek = 1;

      while (dateInitialYear < dateFinalYear) {

        dateInitialYear.setDate(dateInitialYear.getDate() + 1);
        if (dateInitialYear >= dateFinalYear) {
          break;
        }
        dateInitialYear.setDate(dateInitialYear.getDate() - 1);

        var currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);

        var dayRange = dateInitialYear.getDate() < userDatabase.dayBirth
          && dateInitialYear.getMonth() == userDatabase.monthBirth - 1
          && (dateInitialYear.getDate() + 9) == userDatabase.dayBirth ?
          8 : 7;

        var dateLimit = new Date(dateInitialYear.getFullYear(), dateInitialYear.getMonth(), dateInitialYear.getDate() + dayRange, 0, 0, 0, 0);

        var isCurrentWeek = dateInitialYear <= currentDate && dateLimit > currentDate;

        var isBeforeCurrent = dateInitialYear < currentDate && dateLimit < currentDate;

        var dateFrom = new Date(dateInitialYear.getTime());
        var dateTo = new Date(dateLimit.getTime());

        weeks.push({ dateFrom: dateFrom, dateTo: dateTo, dateFromSt: this.utilService.formatDate(dateFrom), dateToSt: this.utilService.formatDate(dateTo), periodColor: "", index: indexWeek, isCurrentWeek: isCurrentWeek, isBeforeCurrent: isBeforeCurrent, periods: [] });

        dateInitialYear.setDate(dateInitialYear.getDate() + dayRange);

        indexWeek++;
      }


      this.years.push({ date: dateBegin, index: indexYear < 10 ? "0" + indexYear : indexYear.toString(), weeks: weeks, isTheCurrentYear: dateBegin.getFullYear() == (new Date().getFullYear() - 2) });
      indexYear++;

    }
  }

  setValue(key, value) {
    this[key] = value;
  }

  createRange() {

    console.log(this.rangeDateEnd);
    this.rangeDateStart = null;
    this.rangeDateEnd = null;
    this.rangeColor = null;
    this.rangeNivel = null;
  }

}
