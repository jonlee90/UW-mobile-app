import { Component } from '@angular/core';

import { HelperService } from '../../providers/helper';
@Component({
  selector: 'page-app-calculator',
  templateUrl: 'app-calculator.html',
})
export class AppCalculatorPage {
  private screen: string = '0';
  private calculate: boolean = false;

  constructor(public helperService: HelperService) {}

  onKeypadClick(value: any) { 
    if(this.screen == '0') {
      if(value == '*' || value == '/' || value == '+' || value == '-') {
          return;
      }
      this.screen = value;
    }else if(this.calculate && !isNaN(value)) {
      this.screen = value;
    }else {
      this.screen += value;
    } 
    this.calculate = false;
  }
  onCalculate() {
    var charLength = this.screen.length;
    var lastChar = this.screen.substr(charLength - 1); 
    if(lastChar == '*' || lastChar == '/' || lastChar == '+' || lastChar == '-') {
      this.helperService.showPopup('Error', 'Invalid Operation');
      return;
    }
    var answer = eval(this.screen);
    this.screen = answer.toString();
    this.calculate = true;
  }
  onReset() {
    this.screen = '0';
  }
}
