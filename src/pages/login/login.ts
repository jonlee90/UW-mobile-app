import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';

import { HelperService } from '../../providers/helper';
import { UserService } from '../../providers/user';
import { ForgotPwPage } from '../forgot-pw/forgot-pw';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private deviceUid: string;
  private loginInfo: ILoginInfo = { email: '', password: '' };

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public platform: Platform,
              public device: Device,
              public helperService: HelperService,
              public userService: UserService) {
    platform.ready().then(() => {
        this.deviceUid = this.device.uuid;
    });
  }
  login() {
    this.helperService.showLoader('Authenticating...');
    const body = new URLSearchParams();
    body.set('email', this.loginInfo.email);
    body.set('pw', this.loginInfo.password);
    body.set('deviceUid', this.deviceUid);
    this.userService.login(body).subscribe((res) => {
      this.helperService.dismissLoader();
      if(res.token != 0) {
        this.storage.ready().then(() => {
          let currentUser = { id: res.id, email: this.loginInfo.email };
          this.storage.set('key', res.token);
          this.storage.set('currentUser', JSON.stringify(currentUser));
          this.userService.saveCurrentUser(currentUser);
          this.userService.saveLoginKey(res.token);
          this.helperService.showPopup("Success", "Login Successful!");
          this.navCtrl.popToRoot();
        });     
      }else {
        this.helperService.showPopup("Error", res.message);
      } 
    });
  }
  onCreateAccount() {
    this.navCtrl.push(SignupPage);
  }
  onForgotPw() {
    this.navCtrl.push(ForgotPwPage);
  }
}
