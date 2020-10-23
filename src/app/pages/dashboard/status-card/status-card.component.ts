import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { ProgressInfo, StatsProgressBarData } from '../../../core/data/stats-progress-bar';

@Component({
  selector: 'ngx-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss'],
})
export class StatusCardComponent implements OnDestroy {

  private alive = true;

  progressInfoData: ProgressInfo[];

  constructor(private statsProgressBarService: StatsProgressBarData) {
    this.statsProgressBarService.getProgressInfoData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.progressInfoData = data;
      });
  }

  ngOnDestroy() {
    this.alive = true;
  }

}
