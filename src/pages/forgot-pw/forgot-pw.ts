import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';

import { HelperService } from '../../providers/helper';
import { UserService } from '../../providers/user';
import { ChangePwPage } from '../change-pw/change-pw';

@Component({
  selector: 'page-forgot-pw',
  templateUrl: 'forgot-pw.html',
})
export class ForgotPwPage {
  private email: string;

  constructor(public navCtrl: NavController,
              public helperService: HelperService,
              public userService: UserService) {
  }

  onRecoverPw() {
    if(!this.email) {
      this.helperService.showPopup('Error', 'Please enter your email');
      return;
    }
    this.helperService.showLoader("Authenticating...");
    const body = new URLSearchParams();
    body.set('email', this.email);
    this.userService.forgotPassword(body).subscribe((res: any) => {
      this.helperService.dismissLoader();
      // if success then open change PW page to enter the random code and new password
      if(res.Success) {
        this.helperService.showPopup('Success', res.Success);
        this.navCtrl.push(ChangePwPage, { pwOnly: false });
      }else {
        this.helperService.showPopup('Error', res.error);
      }
    });
  }
}
