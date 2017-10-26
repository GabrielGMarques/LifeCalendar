import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  tabSelected:{id:Number,name:string,selected:true};

  selectTab(event){
    this.tabSelected = event;
  }
}
