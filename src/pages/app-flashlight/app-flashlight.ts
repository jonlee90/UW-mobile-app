import { Component } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';
import { Flashlight } from '@ionic-native/flashlight';

import { HelperService } from '../../providers/helper';

@Component({
  selector: 'page-app-flashlight',
  templateUrl: 'app-flashlight.html',
})
export class AppFlashlightPage {
  private isOn: boolean = false;

  constructor(public flashlight: Flashlight,
              public platform: Platform,
              public helperService: HelperService,
              public viewCtrl: ViewController) {
    platform.ready().then(() => {
      if(!this.flashlight.available) {
        this.viewCtrl.dismiss();
        this.helperService.showPopup('Error', 'Flashlight not Available!');
      }
    });
  }
  onToggle() {
    if(!this.isOn) {
        this.isOn = true;
    }else {
        this.isOn = false;
    }
    this.flashlight.toggle();
  }
}
