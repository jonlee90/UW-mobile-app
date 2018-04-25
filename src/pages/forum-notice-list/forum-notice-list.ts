import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ForumInfoPage } from '../forum-info/forum-info';

import { ForumService } from '../../providers/forum';

@Component({
  selector: 'page-forum-notice-list',
  templateUrl: 'forum-notice-list.html',
})
export class ForumNoticeListPage {
  private forums: any;
  private listCounter: number = 0;
  private displayFooter: string = 'off';

  constructor(public navCtrl: NavController,
              public forumService: ForumService) {
  }
  ionViewWillEnter() {    
    if(!this.forums) {
      this.forumService.getForumNoticesYoutube(1, this.listCounter).subscribe((res: any) => {
        if(res.list) {
          this.forums = res.list;
          this.listCounter++;
          if(this.forums.length > 10) {
            this.displayFooter = 'on';
          }
        }
      });
    }
  }
  onMessageClick(notice: any) {
    this.navCtrl.push(ForumInfoPage, {
      forum: notice
    });
  }
  getMoreForums(event: any) {
    this.forumService.getForumNoticesYoutube(1, this.listCounter).subscribe((res: any) => {
      if(res.list) {
        this.forums.push(...res.list);
        this.listCounter++;
        event.complete();
      }
    });
  }
}
