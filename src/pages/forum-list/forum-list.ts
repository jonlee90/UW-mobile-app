import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';

import { ForumAddPage } from '../forum-add/forum-add';
import { ForumInfoPage } from '../forum-info/forum-info';
import { ForumService } from '../../providers/forum';
import { HelperService } from '../../providers/helper';

@Component({
  selector: 'page-forum-list',
  templateUrl: 'forum-list.html'
})
export class ForumListPage {
  private forums: any;
  private custId: number;
  private currentUser: IUserInfo;
  private listCounter: number = 0;
  private displayFooter: string = 'on';
  private searchValue: any;
  private searchTerm = new Subject<any>();

  constructor(public navCtrl: NavController,
              public forumService: ForumService,
              public storage: Storage,
              public helperService: HelperService) {
      //when searchTerm value changes, filter the forums and grab the searched results
      this.forumService.searchObserve(this.searchTerm, this.custId, 0).subscribe((res: any) => {
          console.log(res.list);
          this.forums = res.list;
          this.listCounter = 1;
      });
  }
  ionViewWillEnter() {  
    if(!this.forums) {
      this.helperService.showLoader('Loading...');
      this.storage.ready().then(() => {
        this.storage.get('currentUser').then((currentUser: string) => {
          this.currentUser = JSON.parse(currentUser);
          if(this.currentUser) {
            this.custId = this.currentUser.id;
          }else {
            this.custId = 0;
          }
          this.forumService.getForums(this.custId, this.listCounter).subscribe((res: any) => {
            if(res.list) {
              this.forums = res.list;
              this.listCounter++;
            }
            this.helperService.dismissLoader();
          });
        });
      });  
    }
  }
  getMoreForum(event: any) {
    if(this.searchValue == '' || !this.searchValue) {
      this.forumService.getForums(this.custId, this.listCounter).subscribe((res: any) => {
        if(res.list) {
          this.forums.push(...res.list);
          this.listCounter++;
          event.complete();
        }
      });
    }else {
      this.forumService.searchForums(this.searchValue, this.custId, this.listCounter).subscribe((res: any) => {
        if(res.list) {
          this.forums.push(...res.list);
          this.listCounter++;
          event.complete();
        }
      });
    }
  }
  onForumClick(forum: any) { 
    this.navCtrl.push(ForumInfoPage, {
      forum: forum
    });
  }
  onPostQuestion() {
    if(!this.currentUser) {
      this.helperService.showPopup('Alert', 'Must be logged in!');
      return;
    }
    this.navCtrl.push(ForumAddPage, {
      currentUser: this.currentUser
    });
  }
  onScroll(e: any) {
    if(e.directionY == 'down') {
      this.displayFooter = 'off';
    }else {
      this.displayFooter = 'on';
    }
  }
}
