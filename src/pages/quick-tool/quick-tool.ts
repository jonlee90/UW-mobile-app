import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppCalculatorPage } from '../app-calculator/app-calculator';
import { AppDateCalculatorPage } from '../app-date-calculator/app-date-calculator';
import { AppDateCountdownPage } from '../app-date-countdown/app-date-countdown';
import { AppFlashlightPage } from '../app-flashlight/app-flashlight';
import { AppUnitConverterPage } from '../app-unit-converter/app-unit-converter';

@Component({
  selector: 'page-quick-tool',
  templateUrl: 'quick-tool.html',
})
export class QuickToolPage {
  private applications: any[];

  constructor(public navCtrl: NavController) {
  }

  ionViewWillEnter() {
    this.applications = [
      { name: 'QUICKTOOL-CALC', page: AppCalculatorPage },
      { name: 'QUICKTOOL-DATECALC', page: AppDateCalculatorPage },
      { name: 'QUICKTOOL-FLASHLIGHT', page: AppFlashlightPage },
      { name: 'QUICKTOOL-HOLIDAY', page: AppDateCountdownPage },
      { name: 'QUICKTOOL-UNIT', page: AppUnitConverterPage }
    ];
  }
  onPageClick(page) {
    if(page == 'Home') {
      this.navCtrl.popToRoot();
      return;
    }
    this.navCtrl.push(page);
  }
}
