import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';



@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  private splashPage: any;

  constructor(public viewCtrl: ViewController, 
              public splashScreen: SplashScreen,
              private params: NavParams) {
    this.splashPage = this.params.get('splash');
  }

  ionViewDidEnter() {
    this.splashScreen.hide();
  }
}
