import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { ForumService } from '../../providers/forum';
import { HelperService } from '../../providers/helper';
import { UserService } from '../../providers/user';

import { AdvertisementPage } from '../advertisement/advertisement';
import { ForumYoutubeListPage } from '../forum-youtube-list/forum-youtube-list';
import { ForumNoticeListPage } from '../forum-notice-list/forum-notice-list';
import { ForumInfoPage } from '../forum-info/forum-info';
import { ForumListPage } from '../forum-list/forum-list';
import { StoreListPage } from '../store-list/store-list';
import { LinksPage } from '../links/links';
import { PhoneListPage } from '../phone-list/phone-list';
import { PlansPage } from '../plans/plans';
import { QuickToolPage } from '../quick-tool/quick-tool';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private currentUser: IUserInfo;
  private categories: Array<{title: string, icon: string, icon2?: string, component: any, name: string }>;
  private forumsNotice: any;
  private forumsAll: any;

    constructor(public navCtrl: NavController,
                public storage: Storage,
                public helperService: HelperService,
                public userService: UserService,
                public forumService: ForumService) {}

  ionViewWillEnter() {    
    this.storage.ready().then(() => {
      this.storage.get('currentUser').then((currentUser: string) => {
        this.currentUser = JSON.parse(currentUser);
        if(this.currentUser) {
          this.checkUserStatus();
        }
      });
    });
    this.forumService.getHomeForums(1).subscribe((res) => {
      if(res.list_notice) {
        this.forumsNotice = res.list_notice;
      }
      if(res.list_all) {
        this.forumsAll = res.list_all;
      }
    });
    this.helperService.onMenuClick('PAGE-HOME');
    this.helperService.dismissLoader();
  }
  ngOnInit() {
    this.categories = [
      { title: 'HOME-STORES', icon: 'md-pin', component: StoreListPage, name: 'PAGE-STORE-LIST' },
      { title: 'HOME-PHONES', icon: 'md-phone-portrait', icon2: 'ios-heart', component: PhoneListPage, name: 'PAGE-PHONE-LIST' },
      { title: 'NAV-PROMOTION', icon: 'md-photos', component: AdvertisementPage, name: 'PAGE-ADVERTISEMENT' },
      { title: 'HOME-PLANS', icon: 'ios-copy', component: PlansPage, name: 'PAGE-PLANS' },
      { title: 'NAV-QUICK-TOOLS', icon: 'star', component: QuickToolPage, name: 'PAGE-QUICK-TOOL' },
      { title: 'HOME-LINKS', icon: 'md-browsers', component: LinksPage, name: 'PAGE-LINKS' },
      { title: 'HOME-NOTICE', icon: 'md-warning', component: ForumNoticeListPage, name: 'PAGE-FORUM-NOTICE-LIST' },
      { title: 'HOME-FAQ', icon: 'md-search', component: ForumListPage, name: 'PAGE-FORUM-LIST' },
      { title: 'HOME-YOUTUBE', icon: 'logo-youtube', component: ForumYoutubeListPage, name: 'PAGE-FORUM-YOUTUBE-LIST' }
    ];
  }
  onForumClick(forum: any) {
    this.navCtrl.push(ForumInfoPage, {
      forum: forum
    });
  }
  onViewAll(page: string) {
    if(page == 'notice') {
      this.navCtrl.push(ForumNoticeListPage);
    }else if(page == 'faq') {
      this.navCtrl.push(ForumListPage);
    }
  }
  checkUserStatus() {
    // check to see if the user is logged in from another device
    this.userService.checkUser(this.currentUser.id).subscribe((res: any) => {
      if(res.token == 0) {
        this.userService.logout();
        this.helperService.showPopup('Logged off', "Logged in from different device!");
      }
    });
  }
  onCatSelect(cat: any) {
    this.navCtrl.push(cat.component);
    // highlight the corrent item in the nav menu
    this.helperService.onMenuClick(cat.name);
  }
  giveBorder(index: number): string {
    if(index == 3 || index == 5) {
      return 'border-topBot';
    }else if(index == 1 || index == 7) {
      return 'border-side';
    }else if(index == 4) {
      return 'border-all';
    }   
  }
}
           