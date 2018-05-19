import { ProgressService } from '../services/progress.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-progress-icon',
  templateUrl: './progress-icon.component.html',
  styleUrls: ['./progress-icon.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressIconComponent implements OnInit {

  constructor(private progressService: ProgressService) { }

  progressIconShown = true;

  ngOnInit() {
    this.progressService.getProgressEmitter()
      .subscribe((event: boolean) => this.progressIconShown = event);
  }
}
