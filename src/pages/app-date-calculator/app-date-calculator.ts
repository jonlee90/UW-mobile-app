import { Component } from '@angular/core';

import { HelperService } from '../../providers/helper';
import Countdown from 'countdown';

@Component({
  selector: 'page-app-date-calculator',
  templateUrl: 'app-date-calculator.html',
})
export class AppDateCalculatorPage {
  private currentDay: number;
  private currentMonth: number;
  private currentYear: number;
  private futureDay: number;
  private futureMonth: number;
  private futureYear: number;
  private remainingDays: string;

  constructor(public helperService: HelperService) {}

  ionViewWillEnter() {
    let currentDate = new Date();
    this.currentDay = currentDate.getDate();
    this.currentMonth = currentDate.getMonth();
    this.currentMonth++;
    this.currentYear = currentDate.getFullYear();
  }
  onGetRemainingDays() {
    this.remainingDays = null;
    if(this.currentDay > 31 || this.futureDay > 31 || this.currentMonth > 12 || this.futureMonth > 12) {
        this.helperService.showPopup('Error', 'Invalid Dates');
        return;
    }
    if(this.futureYear < this.currentYear) {
        this.helperService.showPopup('error', 'Invalid Years');
        return;
    }
    if(this.futureYear == this.currentYear &&( this.currentMonth > this.futureMonth)) {
        this.helperService.showPopup('error', 'From must be greater than To');
        return;
    }
    if(this.futureYear == this.currentYear && this.currentMonth == this.futureMonth && this.currentDay > this.futureDay) {
        this.helperService.showPopup('error', 'From must be greater than To');
        return;
    }
    this.currentMonth--;
    this.futureMonth--;
    let start = new Date(this.currentYear, this.currentMonth, this.currentDay);
    let end = new Date(this.futureYear, this.futureMonth, this.futureDay);
    this.remainingDays = this.countdownDates(start, end);
    this.currentMonth++;
    this.futureMonth++;
  }
  countdownDates(start: Date, end: Date): string {
    var timer = Countdown(start, end, Countdown.DAYS).toString();
    return timer;
  }
}
