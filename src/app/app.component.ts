import { Component, ViewChild, enableProdMode } from '@angular/core';
import { Platform, MenuController, Nav, AlertController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AdvertisementPage } from '../pages/advertisement/advertisement';
import { ContactPage } from '../pages/contact/contact';
import { ForumListPage } from '../pages/forum-list/forum-list';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { QuickToolPage } from '../pages/quick-tool/quick-tool';
import { SplashPage } from '../pages/splash/splash';
import { StoreListPage } from '../pages/store-list/store-list';
import { UserProfilePage } from '../pages/user-profile/user-profile';

import { AdvertisementService } from '../providers/advertisement';

import { HelperService } from '../providers/helper';
import { UserService } from '../providers/user';
import { Push, PushToken } from '@ionic/cloud-angular';

enableProdMode();
@Component({
  templateUrl: 'app.html',
  styles: [`
    ion-content {
      background-color: rgb(65, 64, 66);
    }
    .nav-menu {
      display: inline-block;
    }
    .nav-menu-text {
      vertical-align: super;
    }
    .nav-menu-text p {
      font-weight: bold;
      color: white;
    }
    button {
      padding-left: 0px;
    }
    ion-icon {
      font-size: 28px;
    }
    .social-icon {
      vertical-align: sub;
    }
    .item-md, .item-ios { 
      background-color: rgb(65, 64, 66);
      color: white;
    }
    .item-ios.activated, .item-md.activated, .selectedMenu  {
      background-color: rgb(248, 160, 28);
    }
    .translate-container {
      text-align: center;
    }
    .translate-container button{
      padding: 0px;
    }
    .user-container {
      padding: 0px;
    }
    .user-email p{
      margin: 0 auto;
    }
    .pad-left {
      padding-left: 10px;
    }
    p {
      color: white;
    }
    .user-btn-container button{
      font-size: 10px;
      padding: 0px;
      width: 100%;
      height: 23px;
    }
    .user-avatar-container ion-avatar{
      margin: 0px;
    }
    .user-avatar-container img {
      width: 100% !important;
      height: 100% !important;
    }
    .user-info-container {
      margin: auto;
    }
    .user-info-container p {
      color: white;
    }
    .toolbar-ios ion-title {
      padding: 0 50px 1px;
    }
  `]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public loginKey: string;
  currentUser: IUserInfo;
  currentUserPic: string;
  rootPage: any = HomePage;
  pages: Array<{title: string, icon: string, component: any, name: string}>;
  hasPushed: boolean = false;
  activePage: any;

  constructor(public platform: Platform, 
              public push: Push,
              public statusBar: StatusBar, 
              public storage: Storage,
              public splashScreen: SplashScreen,
              public menu: MenuController,
              public alertCtrl: AlertController,
              public userService: UserService,
              public helperService: HelperService,
              public browser: InAppBrowser,
              public modalCtrl: ModalController,
              public translate: TranslateService,
              public advertisementService: AdvertisementService) {
    platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.advertisementService.getSplashPage().subscribe((res: any) => {
            if(!this.hasPushed) {
              let splash = modalCtrl.create(SplashPage, { splash: res.splash[0] });
              splash.present();
            }
        });
    });
    if(platform.is('cordova')) {
      // PUSH NOTIFICATIONS
      this.push.register().then((t: PushToken) => {
        this.userService.saveToken(t.token).subscribe((res) => { });
        this.push.saveToken(t);
      });
      this.push.rx.notification().subscribe((msg) => {
        var pay = JSON.parse(JSON.stringify(msg.payload));
        // If there's add then open the advertise page
        if(pay.adId > 0) {
          this.hasPushed = true;
          this.advertisementService.getSpecificSplashPage(pay.adId).subscribe((res: any) => {
            if(res.splash) {
              let splash = modalCtrl.create(SplashPage, { splash: res.splash[0] });
              splash.present();
            }
          });
        }
      });
    }
    this.pages = [
      { title: 'NAV-LOGIN', icon: 'md-log-in', component: LoginPage, name: 'PAGE-LOGIN' },
      { title: 'NAV-HOME', icon: 'home', component: HomePage, name: 'PAGE-HOME' },
      { title: 'NAV-PROMOTION', icon: 'md-photos', component: AdvertisementPage, name: 'PAGE-ADVERTISEMENT' },
      { title: 'NAV-STORES', icon: 'pin', component: StoreListPage, name: 'PAGE-STORE-LIST' },
      { title: 'NAV-QUICK-TOOLS', icon: 'star', component: QuickToolPage, name: 'PAGE-QUICK-TOOL' },
      { title: 'NAV-FAQ', icon: 'search', component: ForumListPage, name: 'PAGE-FORUM-LIST' },
      { title: 'NAV-CONTACT', icon: 'call', component: ContactPage, name: 'PAGE-CONTACT' }
    ];
    this.helperService.checkIfMenuClicked().subscribe((res: string) => {
      this.activePage = res;
    });
  }
  ngOnInit() {
    this.storage.ready().then(() => {
      this.storage.get('currentUser').then((currentUser: string) => {
        this.currentUser = JSON.parse(currentUser);
        this.currentUserPic = 'assets/img/default-avatar.png';
      });
      this.storage.get('key').then((val: string) => {
          this.loginKey = val;
      });
            //translate default language
      this.storage.get('lang').then((val: string) => {
          if(val) {
            this.translate.use(val);
          }else {
            this.translate.use('en');
          }
      });
    });
    this.userService.getLoginKey().subscribe((key: string) => {
        this.loginKey = key;
    });
    this.userService.getCurrentUser().subscribe((user: IUserInfo) => {
        this.currentUser = user;
    });
    this.activePage = this.pages[1].name;
  }
  openPage(page: any) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    if(this.isPageAlreadyActive(page)) {
        return;
    }
    this.nav.push(page.component);
    this.activePage = page.name;
  }
  isPageAlreadyActive(page: any): boolean {
    return this.nav.getActive().pageRef().nativeElement.tagName === page.name;
  }
  checkActive(page: string): boolean {
    return page == this.activePage;
  }
  onSocialMedia(url) {
    this.platform.ready().then(() => {
      this.browser.create(url, '_system');
    });
  }
  onLogout() {
    let confirm = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.loginKey = '';
            this.userService.logout();
            this.push.unregister();
            this.menu.close();
            if(!this.isPageAlreadyActive('PAGE-HOME')) {
              this.nav.popToRoot();
            }
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    confirm.present();
  }
  onMyAccount() {
    this.nav.push(UserProfilePage);
    this.menu.close();
  }
  onTranslateText(lang: string) {
    this.translate.use(lang);
    this.storage.ready().then(() => {
      this.storage.set('lang', lang);
    });
    this.menu.close();
  }

}
