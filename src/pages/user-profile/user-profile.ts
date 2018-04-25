import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { URLSearchParams } from '@angular/http';

import { ChangePwPage } from '../change-pw/change-pw';
import { HelperService } from '../../providers/helper';
import { UserService } from '../../providers/user';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  private userId: number;
  private currentUserData: any;
  private phoneModel: any;
  private modelName: string;
  private currentUserPic: string;
  private edit: boolean = false;
  private btnType: string = 'USERPROFILE-EDIT';

  constructor(public navCtrl: NavController, 
              public helperService: HelperService,
              public storage: Storage,
              public device: Device,
              public platform: Platform,
              public userService: UserService) {}

  ionViewWillEnter() {  
    if(!this.currentUserData) {
      this.helperService.showLoader('Loading...');
      this.storage.ready().then(() => {
        this.storage.get('currentUser').then((res: string) => {
          var currentUser = JSON.parse(res);
          this.phoneModel = this.device.model;
          this.currentUserPic = 'assets/img/default-avatar.png';
          this.userId = currentUser.id;
          this.userService.getUserDeviceName(this.phoneModel).subscribe((res: any) => {
            if(res.device_name) {
              this.modelName = res.device_name;
            }
          });
          this.userService.getCurrentUserData(this.userId).subscribe((res: any) => {
            if(res.list) {
              this.currentUserData = res.list[0];
            }
            this.helperService.dismissLoader();
          });
        });
      });
    }
  }
  onChangePw() {
    this.navCtrl.push(ChangePwPage, {
      pwOnly: true
    });
  }
  onEditProfile() {
    if(this.edit) {
      this.edit = false;
      this.btnType = 'USERPROFILE-EDIT';
      this.updateProfile();
    }else {
      this.edit = true;
      this.btnType = 'USERPROFILE-SAVE';
    }
  }
  updateProfile() {
    this.helperService.showLoader('Updating...');
    const body = new URLSearchParams();
    body.set('id', this.userId.toString());
    body.set('fName', this.currentUserData.fName);
    body.set('lName', this.currentUserData.lName);
    body.set('email', this.currentUserData.email);
    body.set('dob', this.currentUserData.dob);
    this.userService.updateUser(body).subscribe((res) => {
      this.helperService.dismissLoader();
      if(res.success) {
        this.currentUserData.fName = res.fName;
        this.currentUserData.lName = res.lName;
        this.currentUserData.email = res.email;
        this.currentUserData.dob = res.dob;
        this.helperService.showPopup('Success', res.success);
      }else {
        this.helperService.showPopup('Error', 'Update failed');
      }
    });
  }
}
