import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-weekly-list',
  templateUrl: './weekly-list.component.html',
  styleUrls: ['./weekly-list.component.css'],
  
})
export class WeeklyListComponent implements OnInit {
  years = []
  yearBirth = 1997;
  monthBirth = 10;
  dayBirth = 12;
  constructor() { }

  ngOnInit() {

    
    var dateBegin = new Date(this.yearBirth,this.monthBirth,this.dayBirth);
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
        var dateBeginDay = dateBegin.getDay();

        var currentDate = new Date();
        
        currentDate = new Date(currentDate.getFullYear()-1,currentDate.getMonth(),currentDate.getDate(),0,0,0,0);

        var dateLimit =  new Date(dateBeginYear,dateBeginMonth,dateBeginDay+dayRange,0,0,0,0);
        

        var isCurrentWeek = dateBegin <= currentDate && dateLimit >= currentDate;

        dateBegin.setDate(dateBegin.getDate()+dayRange);

        weeks.push({date:dateBegin,index:indexWeek,isCurrentWeek:isCurrentWeek});
        indexWeek++;
      }
      this.years.push({date:dateBegin,index:indexYear<10?"0"+indexYear:indexYear.toString() ,weeks:weeks,isTheCurrentYear:dateBegin.getFullYear() == (new Date().getFullYear()-2)});
      indexYear++;
    }
  }

}
