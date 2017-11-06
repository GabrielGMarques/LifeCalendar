
import { Period } from '../shared/period.model';
import { ElementRef,Component, Input, OnInit } from '@angular/core';
import { NgModel,FormsModule } from '@angular/forms';
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-period-edit',
  templateUrl: './period-edit.component.html',  
  styleUrls: ['./period-edit.component.css']
})

export class PeriodEditComponent implements OnInit {

  @Input() periods: FirebaseListObservable<Period[]>;

  constructor(public db: AngularFireDatabase) { }

 
 
  @Input() period:Period;

  colors:string[] = ["#007700","#e91e63","#9c27b0","#7e57c2","#3f51b5","#2196f3","#009688"];
  ngOnInit() {
    if(!this.period){
      this.period = new Period();
    }
  }
  
  savePeriod(name,dateFrom:string,dateTo:string,color:string,level:number){
    var period = new Period(name,new Date(dateFrom),new Date(dateTo),new Date(dateFrom).getTime(),new Date(dateTo).getTime(),color,level);
    this.periods.push(period);
  }

}
