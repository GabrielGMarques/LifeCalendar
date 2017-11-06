import { Week } from '../shared/week.model';
import { Year } from '../shared/year.model';
import { Period } from '../shared/period.model';
import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

// import { NgModule } from '@angular/core';

const now = new Date();

@Component({
  selector: 'app-weekly-list',
  templateUrl: './weekly-list.component.html',
  styleUrls: ['./weekly-list.component.css'],

})

// @NgModule({
//   imports:[NgbModule]
// })

export class WeeklyListComponent implements OnInit {
  years: Year[] = [];
  yearBirth = 1997;
  monthBirth =9;
  dayBirth = 12;
  date: { year: number, month: number };
  rangeDateStart;
  rangeDateEnd = "";
  rangeColor;
  rangeNivel;
  periods: Period[] = [];

  periodList: FirebaseListObservable<Period[]>;

  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {
    this.buildWeeks();
    this.getChatData();
  }
  updatePeriods() {
    this.periods.sort((period)=>period.dateToLong).forEach((period) => {
      this.years.forEach((year) => {
        year.weeks.forEach((week) => {
          if(period.dateFromLong <= week.dateTo.getTime() && period.dateToLong >= week.dateFrom.getTime()){
              week.period= period;
              console.log(week.period);
          }
        });
      });
    });
  }
  formatDate(date: Date) {
    var day = date.getDate();
    var month = date.getMonth();
    month++;
    var year = date.getFullYear();

    return (day >9?day:"0"+day)+ '/' +(month >9?month:"0"+month)+ '/' + year;
  }

  buildWeeks() {
    var dateBegin = new Date(this.yearBirth, this.monthBirth, this.dayBirth);
    var dateEnd = new Date(this.yearBirth + 80, this.monthBirth, this.dayBirth);
    this.years = [];
    var indexYear = 0;

    // while(dateBegin < dateEnd){
    for (var i = 0; i <= 80; i++) {
      var dateFinalYear = new Date(this.yearBirth + (i + 1), this.monthBirth, this.dayBirth);
      var dateInitialYear = new Date(this.yearBirth + i, this.monthBirth, this.dayBirth);
      var weeks: Week[] = [];
      var indexWeek = 1;

      while (dateInitialYear < dateFinalYear) {
        
        dateInitialYear.setDate(dateInitialYear.getDate()+1);
        if(dateInitialYear >= dateFinalYear){
          break;
        }
        dateInitialYear.setDate(dateInitialYear.getDate()-1);

        var currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);


        var dateLimit = new Date(dateInitialYear.getFullYear(), dateInitialYear.getMonth(), dateInitialYear.getDate() + 7, 0, 0, 0, 0);
      
        var dayRange = dateInitialYear.getDate() < this.dayBirth 
                              && dateInitialYear.getMonth() == this.monthBirth
                              && (dateInitialYear.getDate()+9) == this.dayBirth ? 
                                8:  7;
        if(dayRange == 8){
          dateLimit.setDate(dateLimit.getDate()+1);
        }
        var isCurrentWeek = dateInitialYear <= currentDate && dateLimit > currentDate;
        var dateFrom = new Date(dateInitialYear.getTime());
        var dateTo = new Date(dateLimit.getTime());

        weeks.push({ dateFrom: dateFrom, dateTo: dateTo, dateFromSt: this.formatDate(dateFrom), dateToSt: this.formatDate(dateTo), periodColor: "", index: indexWeek, isCurrentWeek: isCurrentWeek,period:null });
        
        dateInitialYear.setDate(dateInitialYear.getDate() + dayRange);

        indexWeek++;
      }


      this.years.push({ date: dateBegin, index: indexYear < 10 ? "0" + indexYear : indexYear.toString(), weeks: weeks, isTheCurrentYear: dateBegin.getFullYear() == (new Date().getFullYear() - 2) });
      indexYear++;

    }
  }

  getChatData() {
    this.periodList = this.db.list('periods');
    
    this.periodList.forEach((item) => {
      
      this.periods = [];
      
      item.forEach((period) => {
        this.periods.push(period)
      });

      this.updatePeriods();

    });
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
