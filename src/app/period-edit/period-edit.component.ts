import { observable } from 'rxjs/symbol/observable';

import { Period } from '../shared/period.model';
import { Component, ElementRef, Input, OnInit, ViewChild,Pipe,Injectable,PipeTransform } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
declare var $: any;

@Component({
  selector: 'app-period-edit',
  templateUrl: './period-edit.component.html',
  styleUrls: ['./period-edit.component.css']
})

export class PeriodEditComponent implements OnInit {

  @Input() periods: FirebaseListObservable<Period[]>;

  periodsList: { key: number, period: Period }[] = [];
  periodsListDatabase: { key: number, period: Period }[] = [];


  @Input() period: Period;

  colors: string[] = ["#007700", "#e91e63", "#9c27b0", "#7e57c2", "#3f51b5", "#2196f3", "#009688"];

  constructor(public db: AngularFireDatabase) {


  }
  @ViewChild("namePeriod") namePeriod: ElementRef;
  @ViewChild("dateFromInput") dateFromInput: ElementRef;
  @ViewChild("dateToInput") dateToInput: ElementRef;
  @ViewChild("colorInput") colorInput: ElementRef;
  @ViewChild("levelInput") levelInput: ElementRef;
  @ViewChild("idPeriodEdited") idPeriodEdited: ElementRef;
  @ViewChild("levelInputFilter") levelInputFilter: ElementRef;
  

  ngOnInit() {
    this.updatePeriodsList();
    $('#periodLevelEditFilter').on('change',()=>this.updatePeriodsList());

  }

  updatePeriodsList(){
    
    this.periods.forEach((observable) => {
      this.periodsList = [];
      this.periodsListDatabase = [];

      observable.forEach((item, key) => {

        item.dateFrom = new Date(item.dateFromLong);
        item.dateTo = new Date(item.dateToLong);
        if(item.level == this.levelInputFilter.nativeElement.value){
    
          this.periodsList.push({ key: key, period: item });
        }

        this.periodsListDatabase.push({ key: key, period: item });
        
        
      });
      this.periodsList = this.periodsList.sort((a,b)=>b.period.dateToLong - a.period.dateToLong );
    });
  }
  editPeriod(key) {
    var period = this.periodsList.find((item) => item.key == key).period;
    this.namePeriod.nativeElement.value = period.name;
    var dateFrom = new Date(period.dateFromLong);
    var dateTo = new Date(period.dateToLong);
    this.dateFromInput.nativeElement.value = (dateFrom.getMonth()+1)+"/"+dateFrom.getDate()+"/"+dateFrom.getFullYear();
    this.dateToInput.nativeElement.value = (dateTo.getMonth()+1)+"/"+dateTo.getDate()+"/"+dateTo.getFullYear();
    this.colorInput.nativeElement.value = period.color;
    this.levelInput.nativeElement.value = period.level;
    this.idPeriodEdited.nativeElement.value = key;

  }
 deletePeriod(key) {
    var periodList = this.periodsListDatabase.filter(item=>item.key != key);
    
    this.periods.remove();
    //TODO:please change that
    periodList.forEach(period=>this.periods.push(period.period))
    

  }

  savePeriod() {
    var name = this.namePeriod.nativeElement;
    var dateFrom = this.dateFromInput.nativeElement;
    var dateTo = this.dateToInput.nativeElement
    var color = this.colorInput.nativeElement
    var level = this.levelInput.nativeElement
    var idPeriodEdited = this.idPeriodEdited.nativeElement;

    var period = new Period(name.value, new Date(dateFrom.value), new Date(dateTo.value), new Date(dateFrom.value).getTime(), new Date(dateTo.value).getTime(), color.value, level.value);
    if (idPeriodEdited.value != "") {
      this.periodsListDatabase.find(item=>item.key == idPeriodEdited.value).period = period;
 
      var periodList = this.periodsListDatabase;
      
      this.periods.remove();
      //TODO:please change that
      periodList.forEach(period=>this.periods.push(period.period))
      
      idPeriodEdited.value = "";

    } else {
      this.periods.push(period);
      $('#periodModal').modal('toggle');
    }

    [name,dateFrom,dateTo,idPeriodEdited].forEach(item=>item.value = "");
    color.value = "#e91e63";
    level.value = 4;
  }

  formatDate(date) {

  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return  (monthIndex+1) + "/"+day + "/" + year;
  }
}
