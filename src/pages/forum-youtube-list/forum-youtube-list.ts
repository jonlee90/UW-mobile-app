import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ForumInfoPage } from '../forum-info/forum-info';
import { ForumService } from '../../providers/forum';

@Component({
  selector: 'page-forum-youtube-list',
  templateUrl: 'forum-youtube-list.html',
})
export class ForumYoutubeListPage {
  private forums: any;
  private listCounter: number = 0;
  private displayFooter: string = 'off';

  constructor(public navCtrl: NavController,
              public forumService: ForumService) {
  }

  ionViewWillEnter() {    
    if(!this.forums) {
      this.forumService.getForumNoticesYoutube(3, this.listCounter).subscribe((res: any) => {
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
  onVideoClick(video: any) {
    this.navCtrl.push(ForumInfoPage, {
      forum: video
    });
  }
  getMoreForums(event: any) {
    this.forumService.getForumNoticesYoutube(3, this.listCounter).subscribe((res: any) => {
      if(res.list) {
        this.forums.push(...res.list);
        this.listCounter++;
        event.complete();
      }
    });
  }
}
