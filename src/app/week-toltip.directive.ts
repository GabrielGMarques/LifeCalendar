import { Directive, ElementRef,Renderer,Input  } from '@angular/core';
import { Week } from './shared/week.model';

@Directive({
  selector: '[appWeekToltip]'
})
export class WeekToltipDirective {
   
   @Input() appWeekToltip: Week;

   constructor(private el: ElementRef,private renderer: Renderer) {
    //  var tooltip = "<div class='week-tooltip'>"
    //  tooltip = tooltip.concat(`<div class='week-title-tooltip'>${this.appWeekToltip.dateFromSt} to ${this.appWeekToltip.dateToSt}</div>`);
    // //  this.appWeekToltip.periods.forEach((period)=>{

    // //  });
     
    //  tooltip = tooltip.concat("</div>");
   }

   ngOnInit(){
   }
}
