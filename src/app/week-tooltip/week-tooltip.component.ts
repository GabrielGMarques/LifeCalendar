import { Component, Input, OnInit } from '@angular/core';
import { Period } from '../shared/period.model';

@Component({
  selector: 'app-week-tooltip',
  templateUrl: './week-tooltip.component.html',
  styleUrls: ['./week-tooltip.component.css']
})
export class WeekTooltipComponent implements OnInit {

  constructor() { }

  @Input() dateFromSt:string;
  @Input() dateToSt:string;
  @Input() periods:Period[];
  

  ngOnInit() {
  }

}
