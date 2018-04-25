import { Component } from '@angular/core';

import Convert from 'convert-units';

@Component({
  selector: 'page-app-unit-converter',
  templateUrl: 'app-unit-converter.html',
})
export class AppUnitConverterPage {
  private units: any[] = [];
  private selectedUnit: any[] = [];
  private leftMeasure: string;
  private rightMeasure: string;
  private convertedValue: string;
  private enteredValue: number;

  constructor() {}

  ionViewWillEnter() {
    let length = Convert().list('length');
    this.units.push({ 'measures': length, 'name': 'Length'});
    let mass = Convert().list('mass');
    this.units.push({ 'measures': mass, 'name': 'Mass'});
    let volume = Convert().list('volume');
    this.units.push({ 'measures': volume, 'name': 'Volume'});
    let temp = Convert().list('temperature');
    this.units.push({ 'measures': temp, 'name': 'Temperature'});
    let time = Convert().list('time');
    this.units.push({ 'measures': time, 'name': 'Time'});
    let speed = Convert().list('speed');
    this.units.push({ 'measures': speed, 'name': 'Speed'});
    let digital = Convert().list('digital');
    this.units.push({ 'measures': digital, 'name': 'Digital'});
    this.selectedUnit = this.units[0];
    this.leftMeasure = this.units[0].measures[0].abbr;
    this.rightMeasure = this.units[0].measures[1].abbr;
  }
  onConvertValue() {
    this.convertedValue = Convert(this.enteredValue).from(this.leftMeasure).to(this.rightMeasure);
  }
  onUnitSelect(event: any) {
    this.leftMeasure = event.measures[0].abbr;
    this.rightMeasure = event.measures[1].abbr;
  }
}
