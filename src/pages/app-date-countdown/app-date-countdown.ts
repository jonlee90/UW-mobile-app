import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

import { HelperService } from '../../providers/helper';
import Countdown from 'countdown';
import DateHoliday from 'date-holidays';

@Component({
  selector: 'page-app-date-countdown',
  templateUrl: 'app-date-countdown.html',
})
export class AppDateCountdownPage {
  @ViewChild(Content) content: Content;
  private currentHolidays: any;
  private futureHolidays: any;
  private days: any[];
  private firstWeek: any[] = [];
  private secondWeek: any[] = [];
  private thirdWeek: any[] = [];
  private fourthWeek: any[] = [];
  private fifthWeek: any[] = [];
  private sixthWeek: any[] = [];
  private day: number;
  private month: string;
  private year: number;
  private months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  constructor(public helperService: HelperService) {}

  ionViewWillEnter() {
    let currentDate = new Date();
    let nextYearDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    let currentYear = currentDate.getFullYear();
    let hd = new DateHoliday('US', 'ca');
    this.currentHolidays = hd.getHolidays(currentYear);
    let nextYear = currentYear + 1;
    this.futureHolidays = hd.getHolidays(nextYear);
    this.removeHolidays(currentDate, this.currentHolidays, true);
    this.removeHolidays(nextYearDate, this.futureHolidays, false);
    this.getToday();
  }
  getToday() {
    this.firstWeek = [];
    this.secondWeek = [];
    this.thirdWeek = [];
    this.fourthWeek = [];
    this.fifthWeek = [];
    this.sixthWeek = [];
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    this.getDaysInMonth(currentMonth, currentYear);
    this.insertDates();
  }
  highlightDate(date) {
    if(date == '') {
      return;
    }
    let sDate = date.getDate();
    if(sDate == this.day) {
      return true;
    }else {
      return false;
    }
  }
  getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    this.days = [];
    while (date.getMonth() === month) {
        this.days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    this.day = new Date().getDate();
    this.month = this.months[month];
    this.year = year;
  }
  insertDates() {
    let startDate = this.days[0].toString().substring(0, 3);
    let firstWeekCount;

    switch(startDate) {
      case 'Sun': 
        firstWeekCount = 7
        break;
      case 'Mon':
        firstWeekCount = 6
        break;
      case 'Tue':
        firstWeekCount = 5
        break;
      case 'Wed':
        firstWeekCount = 4
        break;
      case 'Thu':
        firstWeekCount = 3
        break;
      case 'Fri':
        firstWeekCount = 2
        break;
      case 'Sat':
        firstWeekCount = 1
        break;
      default: 
        console.log('case');
    }
    for(let i = 0; i < firstWeekCount; i++) {
      this.firstWeek.push(this.days[i]);
    }
    for(let i = 0; i < firstWeekCount; i++) {
      this.days.splice(0, 1);
    }
    var arrayLength = this.firstWeek.length;
    if(arrayLength < 7) {
      for(let i = arrayLength; i < 7; i++) {
        this.firstWeek.unshift('');
      }
    }
    for(let i = 0; i < this.days.length; i++) {
      if(i < 7) {
        this.secondWeek.push(this.days[i]);
      }else if(6 < i && i < 14) {
        this.thirdWeek.push(this.days[i]);
      }else if(13 < i && i < 21) {
        this.fourthWeek.push(this.days[i]);
      }else if(20 < i && i < 28) {
        this.fifthWeek.push(this.days[i]);
      }else {
        this.sixthWeek.push(this.days[i]);
      }
    }
    this.checkDateArrayLength(this.fourthWeek);
    this.checkDateArrayLength(this.fifthWeek);
    this.checkDateArrayLength(this.sixthWeek);
  }
  onHolidayClick(holi) {
    this.firstWeek = [];
    this.secondWeek = [];
    this.thirdWeek = [];
    this.fourthWeek = [];
    this.fifthWeek = [];
    this.sixthWeek = [];
    var month = holi.start.getMonth();
    var year = holi.start.getFullYear();
    this.getDaysInMonth(month, year);
    this.day = holi.start.getDate();
    this.insertDates();
    this.content.scrollToTop();
  }
  checkDateArrayLength(dates) {
    var dateLength = dates.length;
    if(dateLength == 7) {
      return;
    }else {
      for(let i = dateLength; i < 7; i++) {
        dates.push('');
      }
    }
  }
  returnDate(date): any {
    if(date != '') {
      return date.getDate();
    }else {
      return date;
    }
  }
  removeHolidays(time: Date, array: any, present: boolean) {
    let nonHoliday = [ "New Year's Day (substitute day)", "Susan B. Anthony Day", "Washington’s Birthday", "César Chávez Day", "Administrative Professionals Day",
                      "Malcolm X Day", "Harvey Milk Day", "Day after Thanksgiving Day", "Christmas Eve"];
    for(let i = 0; i < array.length; i++) {
      var currentItem = array[i];
      if(present) {
        if(currentItem.start.getTime() < time.getTime()) {
          array.splice(i, 1);
          i--;
          continue;
        }
      }else {
        if(currentItem.start.getTime() > time.getTime()) {
          array.splice(i, 1);
          i--;
          continue;
        }
      }
      for(let j = 0; j < nonHoliday.length; j++) {
        if(currentItem.name == nonHoliday[j]) {
          array.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }
  countdownDates(end: Date): string {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    var timer = Countdown(currentDate, end, Countdown.DAYS).toString();
    return timer;
  }
}
