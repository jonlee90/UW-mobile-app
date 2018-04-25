import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';

import { ForumService } from '../../providers/forum';
import { HelperService } from '../../providers/helper';

@Component({
  selector: 'page-forum-add',
  templateUrl: 'forum-add.html',
})
export class ForumAddPage {
  private title: string;
  private message: string;
  private is_public: string = '0';
  private currentUser: IUserInfo;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public helperService: HelperService,
              public forumService: ForumService) {
    this.currentUser = this.navParams.get('currentUser');
  }
  onAddForum() {
    this.helperService.showLoader('Please wait...');
    const body = new URLSearchParams();
    body.set('is_public', this.is_public);
    body.set('title', this.title);
    body.set('msg', this.message);
    body.set('cust_id', this.currentUser.id.toString());
    this.forumService.addForum(body).subscribe((res: any) => {
      this.helperService.dismissLoader();
      if(res.success) {
        this.helperService.showPopup('Success', 'Message submitted!');
      }else if(res.error){
        this.helperService.showPopup('Error', res.error);
      }else {
        this.helperService.showPopup('Error', 'Unable to submit');
      }
      this.navCtrl.pop();
    });
  }
}
