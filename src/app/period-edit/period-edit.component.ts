import { MessageAlertService } from '../services/message-alert.service';
import { UtilService } from '../services/util.service';
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

  constructor(private db: AngularFireDatabase,
    private messageAlertService:MessageAlertService,
    private periodService: PeriodService,
    private utilService: UtilService) {}

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
  }

  ngAfterViewInit() {
    $('[data-toggle="datepicker"]').datepicker({ dateFormat: "dd/mm/yy" });
    $('#periodLevelEditFilter').on('change', () => this.updatePeriodsList(this.periodService.getPeriods()));
    $('#periodColorIput').on('change', () => { this.colorInput.nativeElement.focus = false; });
    $('#dateFromInput').on('change', () => { this.validateDates() });
    $('#dateToInput').on('change', () => { this.validateDates() });
  }

  validateDates() {
    var dateFromNativeElement = this.dateFromInput.nativeElement;
    var dateToNativeElement = this.dateToInput.nativeElement;

    if (dateFromNativeElement.value && dateToNativeElement.value) {

      var dateFrom = this.utilService.parseDate(dateFromNativeElement.value);
      var dateTo = this.utilService.parseDate(dateToNativeElement.value);
      if(dateTo <= dateFrom){
        dateToNativeElement.value = dateFromNativeElement.value;
        this.messageAlertService.showErrorMessage('The final date of a period cannot be less then the initial date')
      }
      var timeDiff = dateTo.getTime() - dateFrom.getTime();
      var periodDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

      this.levelInput.nativeElement.value = periodDays < 7 ? 1 : (periodDays < 365 ? 2 : (periodDays == 365 ? 3 : 4));
    }
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
    this.dateFromInput.nativeElement.value = this.utilService.formatDate(dateFrom);
    this.dateToInput.nativeElement.value = this.utilService.formatDate(dateTo);
    this.colorInput.nativeElement.value = period.color;
    this.levelInput.nativeElement.value = period.level;
    this.idPeriodEdited.nativeElement.value = key;

  }
  deletePeriod(key: string) {
    this.periodService.deletePeriod(key);
  }
  formatDate(date) {
    return this.utilService.formatDate(date);
  }

  savePeriod() {
    var name = this.namePeriod.nativeElement;
    var dateFrom = this.dateFromInput.nativeElement;
    var dateTo = this.dateToInput.nativeElement
    var color = this.colorInput.nativeElement
    var level = this.levelInput.nativeElement
    var idPeriodEdited = this.idPeriodEdited.nativeElement;

    if(!this.validateForm()){
      return;
    }

    var period = {
      name: name.value,
      dateFrom: this.utilService.parseDate(dateFrom.value),
      dateTo: this.utilService.parseDate(dateTo.value),
      dateFromLong: this.utilService.parseDate(dateFrom.value).getTime(),
      dateToLong: this.utilService.parseDate(dateTo.value).getTime(),
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
    
    this.clearForm();

  }

  validateForm(){
    var name = this.namePeriod.nativeElement.value;
    var dateFrom = this.dateFromInput.nativeElement.value;
    var dateTo = this.dateToInput.nativeElement.value
    var color = this.colorInput.nativeElement.value
    var level = this.levelInput.nativeElement.value
    if(!name || !dateFrom || !dateTo || !color || !level ){
      this.messageAlertService.showErrorMessage('All the fields are required ');
      return false;
    }
    return true;
  }

  clearForm(){
    var name = this.namePeriod.nativeElement;
    var dateFrom = this.dateFromInput.nativeElement;
    var dateTo = this.dateToInput.nativeElement
    var color = this.colorInput.nativeElement
    var level = this.levelInput.nativeElement
    var idPeriodEdited = this.idPeriodEdited.nativeElement;

    [name, dateFrom, dateTo, idPeriodEdited].forEach(item => item.value = "");
    color.value = "#e91e63";
    level.value = 4;
  }

}
