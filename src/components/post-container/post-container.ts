import { Component, Input } from '@angular/core';

import { HelperService } from '../../providers/helper';
import Countdown from 'countdown';
@Component({
  selector: 'comp-post-container',
  templateUrl: 'post-container.html',
})
export class PostContainerComponent {
  @Input() item: any;
  @Input() count: number;
  @Input() itemsLength: number;
  @Input() containerName: any;
  @Input() infScroll: boolean;
  private lastItem: boolean;
  private gray: boolean;

  constructor(public helperService: HelperService) {}

  ngOnInit() {
      this.gray = this.helperService.isOdd(this.count);
      if(this.count == this.itemsLength && !this.infScroll) {
          this.lastItem = true;
      }
  }
  getStoreDistance(distance: number): string {
      if(distance > 999) {
          return '999+';
      }else {
          return distance.toFixed(2);
      }
  }
  getYelpRating(yelp: any): string {
      return this.helperService.getYelpRating(yelp);
  }
  countdownDates(end: Date): string {
      // countdown days for app-date-countdown page
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      var timer = Countdown(currentDate, end, Countdown.DAYS).toString();
      return timer;
  }
}