import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-warning-message',
  templateUrl: './warning-message.component.html',
  styleUrls: ['./warning-message.component.css']
})
export class WarningMessageComponent implements OnInit {

  constructor() { }

  message: string = "";
  alertClass: string = "";
  shown: boolean = false;


  ngOnInit() {
  }

  startDesapearInterval() {
    this.shown = true;

    setInterval(() => {
      this.shown = false;
    }, 5000);
  }

  showErrorMessage(message: string) {
    this.message = message;
    this.alertClass = "alert-danger";
    this.startDesapearInterval();
  }
  showSuccessMessage(message: string) {
    this.message = message;
    this.alertClass = "alert-success";
    this.startDesapearInterval();
  }
}
