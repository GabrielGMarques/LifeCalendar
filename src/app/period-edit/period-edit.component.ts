import { PeriodService } from '../services/period.service';
import { observable } from 'rxjs/symbol/observable';

import { Period } from '../shared/period.model';
import { Component, ElementRef, Input, OnInit, ViewChild, Pipe, Injectable, PipeTransform } from '@angular/core';
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

  periodsList: Period[] = [];


  colors: string[] = ["#007700", "#e91e63", "#9c27b0", "#7e57c2", "#3f51b5", "#2196f3", "#009688"];

  constructor(private db: AngularFireDatabase, private periodService: PeriodService) {


  }
  @ViewChild("namePeriod") namePeriod: ElementRef;
  @ViewChild("dateFromInput") dateFromInput: ElementRef;
  @ViewChild("dateToInput") dateToInput: ElementRef;
  @ViewChild("colorInput") colorInput: ElementRef;
  @ViewChild("levelInput") levelInput: ElementRef;
  @ViewChild("idPeriodEdited") idPeriodEdited: ElementRef;
  @ViewChild("levelInputFilter") levelInputFilter: ElementRef;


  ngOnInit() {
    this.updatePeriodsList(this.periodService.getPeriods());
    this.periodService.getPeriodEmitter().subscribe(periods => {
      this.updatePeriodsList(periods);
    });

    $('#periodLevelEditFilter').on('change', () => this.updatePeriodsList(this.periodService.getPeriods()));
  }

  updatePeriodsList(periods: Period[]) {
    this.periodsList = [];
    periods.sort((a, b) => b.dateToLong - a.dateToLong).forEach(period => {

      period.dateFrom = new Date(period.dateFromLong);
      period.dateTo = new Date(period.dateToLong);

      if (period.level == this.levelInputFilter.nativeElement.value) {
        this.periodsList.push(period);
      }

    });
  }
  editPeriod(key) {
    var period: Period = this.periodsList.find((period) => period.$key == key);
    this.namePeriod.nativeElement.value = period.name;
    var dateFrom = new Date(period.dateFromLong);
    var dateTo = new Date(period.dateToLong);
    this.dateFromInput.nativeElement.value = this.formatDate(dateFrom);
    this.dateToInput.nativeElement.value = this.formatDate(dateTo);
    this.colorInput.nativeElement.value = period.color;
    this.levelInput.nativeElement.value = period.level;
    this.idPeriodEdited.nativeElement.value = key;

  }
  deletePeriod(key: string) {
    this.periodService.deletePeriod(key);
  }

  savePeriod() {
    var name = this.namePeriod.nativeElement;
    var dateFrom = this.dateFromInput.nativeElement;
    var dateTo = this.dateToInput.nativeElement
    var color = this.colorInput.nativeElement
    var level = this.levelInput.nativeElement
    var idPeriodEdited = this.idPeriodEdited.nativeElement;

    var period = {
      name: name.value,
      dateFrom: this.parseDate(dateFrom.value),
      dateTo: this.parseDate(dateTo.value),
      dateFromLong: this.parseDate(dateFrom.value).getTime(),
      dateToLong: this.parseDate(dateTo.value).getTime(),
      color: color.value,
      level: level.value
    };

    if (idPeriodEdited.value != "") {
      this.periodService.updatePeriod(idPeriodEdited.value, period);
    } else {
      this.periodService.savePeriod(period);
      $('#periodModal').modal('toggle');
    }

    idPeriodEdited.value = "";

    [name, dateFrom, dateTo, idPeriodEdited].forEach(item => item.value = "");
    color.value = "#e91e63";
    level.value = 4;
  }
  ngAfterViewInit() {
    $('[data-toggle="datepicker"]').datepicker({ dateFormat: "dd/mm/yy" });
  }

  formatDate(date) {

    var day = date.getDate();
    var monthIndex = date.getMonth() + 1;
    var year = date.getFullYear();

    day = day <= 9 ? `0${day}` : day;
    monthIndex = monthIndex <= 9 ? `0${monthIndex}` : monthIndex;

    return `${day}/${monthIndex}/${year}`;
  }

  parseDate(date){
    
    var dateArray = date.split('/');
    var day = dateArray[0];
    var month = dateArray[1];
    var year = dateArray[2];

    var dateParsed = new Date(year,month,day);
    return dateParsed;
  }
}
