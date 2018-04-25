import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { HelperService } from '../../providers/helper';
import { UserService } from '../../providers/user';

@Component({
  selector: 'page-change-pw',
  templateUrl: 'change-pw.html',
})
export class ChangePwPage {
  private changePwForm: any;
  private pwOnly: boolean = true; 
  private userLoginKey: string;

  constructor(public navCtrl: NavController, 
              public helperService: HelperService,
              public userService: UserService,
              public navParams: NavParams,
              public storage: Storage,
              public formBuilder: FormBuilder) {
  }
  ionViewWillEnter() {    
    this.storage.ready().then(() => {
      this.storage.get('key').then((res: string) => {
        this.userLoginKey = res;
      })
    });
  }
  ngOnInit() {
    this.pwOnly = this.navParams.get('pwOnly');
    this.initializeForm();
    if(!this.pwOnly) {
      this.helperService.showPopup('Alert', 'Please check your email for the code');
    }
  }
  changePw(form: FormGroup) {
    if(form.value.nPassword !== form.value.nPasswordConfirm) {
      this.helperService.showPopup('Error', 'Password does not match');
      return;
    }
    this.helperService.showLoader('Authenticating...');
    const body = new URLSearchParams();
    if(this.pwOnly) {
      body.set('cPassword', form.value.cPassword);
      body.set('nPassword', form.value.nPassword);
      body.set('key', this.userLoginKey);
      this.userService.changePassword(body).subscribe((res: any) => {
        this.helperService.dismissLoader();
        if(res.token == 0) {
          this.helperService.showPopup("Error", res.message);
        }else if(res.token > 0) {
          this.helperService.showPopup("Success", "Password has been updated!");
          this.navCtrl.popToRoot();      
        }else{
          this.helperService.showPopup("Error", "Unable to change password");
        }
      });
    }else {
      body.set('key', form.value.ranCode);
      body.set('pw', form.value.nPassword);
      this.userService.forgotPassword(body).subscribe((res: any) => {
        this.helperService.dismissLoader();
        if(res.Success) {
          this.helperService.showPopup("Success", res.Success);
          this.navCtrl.popToRoot();
        }else { 
          this.helperService.showPopup("Error", res.error);
        }
      });
    }
  }
  initializeForm() {
    var formValues = {
      nPassword: new FormControl('', [Validators.compose([Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,}$/), Validators.required])]),
      nPasswordConfirm: new FormControl('', [Validators.compose([Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,}$/), Validators.required])])
    };
    if(this.pwOnly) {
      formValues['cPassword'] = new FormControl('', [Validators.compose([Validators.required])]);
    }else {
      formValues['ranCode'] = new FormControl('', [Validators.compose([Validators.required])]);
    }
    this.changePwForm  = this.formBuilder.group(formValues);
  }
}
