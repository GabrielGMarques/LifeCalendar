import { Period } from '../shared/period.model';
import { Component, Input, OnInit } from '@angular/core';
import { NgModel,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-period-edit',
  templateUrl: './period-edit.component.html',
  styleUrls: ['./period-edit.component.css']
})

export class PeriodEditComponent implements OnInit {

  constructor() { }
  
  @Input() period:Period;

  colors:string[] = ["#007700","#e91e63","#9c27b0","#7e57c2","#3f51b5","#2196f3","#009688"];

  ngOnInit() {
    if(!this.period){
      this.period = new Period();
    }
  }
  savePeriod(){
    console.log(this.period);
  }

}
