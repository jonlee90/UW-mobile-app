import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import { URLSearchParams } from '@angular/http';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { HelperService } from '../../providers/helper';
import { StoreService } from '../../providers/store';
import { UserService } from '../../providers/user';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private deviceUid: string;
  private registerForm: any;
  private stores: any;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public platform: Platform,
              public helperService: HelperService,
              public device: Device,
              public userService: UserService,
              public formBuilder: FormBuilder,
              public storeService: StoreService) {
    platform.ready().then(() => {
      this.deviceUid = this.device.uuid;
    });
    this.initializeForm();
  }

  ionViewWillEnter() {
    this.storeService.getStoresAccount().subscribe((res) => {
      this.stores = res.list;
    });
  }
  onRegister(form: FormGroup) {
    if(!form.value.termsCondition) {
      this.helperService.showPopup('Error', 'Please check the Terms and Conditions');
      return;
    }
    if(form.value.password !== form.value.passwordConfirm) {
      this.helperService.showPopup('Error', 'Password does not match');
      return;
    }
    this.helperService.showLoader('Authenticating...');
    const body = new URLSearchParams();
    body.set('fname', form.value.firstName);
    body.set('lname', form.value.lastName);
    body.set('email', form.value.email);
    body.set('dob', form.value.dob);
    body.set('storeId', form.value.storeId);
    body.set('pw', form.value.password);
    body.set('deviceUid', this.deviceUid);
    this.userService.signup(body).subscribe((res: any) => {
      this.helperService.dismissLoader();
      if(res.token == 0) {
        this.helperService.showPopup("Error", "The email is already in use.");
      }else if(res.token) {
        this.storage.ready().then(() => {
          let currentUser = { id: res.id, email: form.value.email };
          this.storage.set('key', res.token);
          this.storage.set('currentUser', JSON.stringify(currentUser));
          this.userService.saveCurrentUser(currentUser);
          this.userService.saveLoginKey(res.token);
          this.helperService.showPopup("Success", "Account created!");
          this.navCtrl.popToRoot();
        });     
      }else{
        this.helperService.showPopup("Error", res.error);
      }
    });
  }
  initializeForm() {
    var today = new Date().toISOString();
    this.registerForm  = this.formBuilder.group({
      firstName: new FormControl('', [Validators.compose([Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/), Validators.required])]),
      lastName: new FormControl('', [Validators.compose([Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/), Validators.required])]),
      email: new FormControl('', [Validators.compose([Validators.email, Validators.required])]),
      dob: new FormControl(today),
      storeId: new FormControl('0', [Validators.compose([Validators.required])]),
      password: new FormControl('', [Validators.compose([Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,}$/), Validators.required])]),
      passwordConfirm: new FormControl('', [Validators.compose([Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,}$/), Validators.required])]),
      termsCondition: [false, Validators.compose([Validators.required])]
    });
  }
}
