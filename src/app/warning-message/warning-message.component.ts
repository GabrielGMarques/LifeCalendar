import { Component, OnInit, Input } from '@angular/core';
import {MessageAlertService} from '../services/message-alert.service'

@Component({
  selector: 'app-warning-message',
  templateUrl: './warning-message.component.html',
  styleUrls: ['./warning-message.component.css']
})
export class WarningMessageComponent implements OnInit {

  constructor(private messageAlertService:MessageAlertService) { }

  message: string = "";
  alertClass: string = "";
  shown: boolean = false;


  ngOnInit() {
    this.messageAlertService.getErrorEmitter().subscribe((message:string)=>this.showErrorMessage(message));
    this.messageAlertService.getSuccessEmitter().subscribe((message:string)=>this.showSuccessMessage(message));
  }


  showErrorMessage(message: string) {
    console.log(message);
    this.message = message;
    this.alertClass = "alert-danger";
    this.startDesapearInterval();
  }
  showSuccessMessage(message: string) {
    this.message = message;
    this.alertClass = "alert-success";
    this.startDesapearInterval();
  }

  startDesapearInterval() {
    this.shown = true;

    setInterval(() => {
      this.shown = false;
    }, 5000);
  }

}
