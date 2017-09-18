import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

const now = new Date();

@Component({
  selector: 'app-weekly-list',
  templateUrl: './weekly-list.component.html',
  styleUrls: ['./weekly-list.component.css'],
  
})

@NgModule({
  imports:[NgbModule]
})

export class WeeklyListComponent implements OnInit {
  years = []
  yearBirth = 1997;
  monthBirth = 10;
  dayBirth = 12;
  model;
  date: {year: number, month: number};
  
  constructor() { }

  ngOnInit() {

    
    var dateBegin = new Date(this.yearBirth-1,this.monthBirth,this.dayBirth);
    var dateEnd = new Date(this.yearBirth+80,this.monthBirth,this.dayBirth);
    
    var indexYear = 0;


    while(dateBegin < dateEnd){

      var year = new Date(this.yearBirth+indexYear,this.monthBirth,this.dayBirth);
      var weeks = []
      var indexWeek = 1;

      while(dateBegin < year){
        var dayRange = dateBegin.getDate() < this.dayBirth 
                      && dateBegin.getMonth() == this.monthBirth? 
                        Math.abs(dateBegin.getDate() - this.dayBirth):  7;

        var dateBeginYear = dateBegin.getFullYear();
        var dateBeginMonth = dateBegin.getMonth();
        var dateBeginDay = dateBegin.getDate();

        var currentDate = new Date();
        
        currentDate = new Date(currentDate.getFullYear()-1,currentDate.getMonth()+1,currentDate.getDate(),0,0,0,0);

        var dateLimit =  new Date(dateBeginYear,dateBeginMonth,dateBeginDay+dayRange,0,0,0,0);
        

        var isCurrentWeek = dateBegin <= currentDate && dateLimit >= currentDate;

        dateBegin.setDate(dateBegin.getDate()+dayRange);

        var dateFrom = dateBeginDay + "/" + dateBeginMonth +"/"+(dateBeginYear+1);
        var dateTo = dateLimit.getDate() + "/" + dateLimit.getMonth() +"/" + (dateLimit.getFullYear()+1);

        weeks.push({dateFrom:dateFrom,dateTo:dateTo, index:indexWeek,isCurrentWeek:isCurrentWeek});
        indexWeek++;
      }
      this.years.push({date:dateBegin,index:indexYear<10?"0"+indexYear:indexYear.toString() ,weeks:weeks,isTheCurrentYear:dateBegin.getFullYear() == (new Date().getFullYear()-2)});
      indexYear++;
    }
  }

}
