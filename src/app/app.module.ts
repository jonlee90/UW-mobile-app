import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule, Http } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'angular2-moment';

import { CallNumber } from '@ionic-native/call-number';
import { Device } from '@ionic-native/device';
import { Firebase } from '@ionic-native/firebase';
import { Flashlight } from '@ionic-native/flashlight';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FooterDirectionComponent } from '../components/footer-direction/footer-direction';
import { HeaderComponent } from '../components/header/header';
import { PageTitleComponent } from '../components/page-title/page-title';
import { PostContainerComponent } from '../components/post-container/post-container';
import { YoutubePlayerComponent } from '../components/youtube-player/youtube-player';

import { AdvertisementPage } from '../pages/advertisement/advertisement';
import { AppCalculatorPage } from '../pages/app-calculator/app-calculator';
import { AppDateCalculatorPage } from '../pages/app-date-calculator/app-date-calculator';
import { AppDateCountdownPage } from '../pages/app-date-countdown/app-date-countdown';
import { AppFlashlightPage } from '../pages/app-flashlight/app-flashlight';
import { AppUnitConverterPage } from '../pages/app-unit-converter/app-unit-converter';
import { ChangePwPage } from '../pages/change-pw/change-pw';
import { ContactPage } from '../pages/contact/contact';
import { ForgotPwPage } from '../pages/forgot-pw/forgot-pw';
import { ForumAddPage } from '../pages/forum-add/forum-add';
import { ForumInfoPage } from '../pages/forum-info/forum-info';
import { ForumListPage } from '../pages/forum-list/forum-list';
import { ForumNoticeListPage } from '../pages/forum-notice-list/forum-notice-list';
import { ForumYoutubeListPage } from '../pages/forum-youtube-list/forum-youtube-list';
import { HomePage } from '../pages/home/home';
import { LinksPage } from '../pages/links/links';
import { LoginPage } from '../pages/login/login';
import { PhoneInfoPage } from '../pages/phone-info/phone-info';
import { PhoneListPage } from '../pages/phone-list/phone-list';
import { PlansPage } from '../pages/plans/plans';
import { QuickToolPage } from '../pages/quick-tool/quick-tool';
import { SignupPage } from '../pages/signup/signup';
import { SplashPage } from '../pages/splash/splash';
import { StoreInfoPage } from '../pages/store-info/store-info';
import { StoreListPage } from '../pages/store-list/store-list';
import { UserProfilePage } from '../pages/user-profile/user-profile';

import { AdvertisementService } from '../providers/advertisement';
import { ForumService } from '../providers/forum';
import { HelperService } from '../providers/helper';
import { LinkService } from '../providers/link';
import { PhoneService } from '../providers/phone';
import { PlanService } from '../providers/plan';
import { StoreService } from '../providers/store';
import { UserService } from '../providers/user';

import { PhoneNumberPipe } from '../pipes/phone-number';
import { SearchFilterPipe } from '../pipes/search-filter';
import { YoutubePipe } from '../pipes/youtube';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '9d9edcb3'
  },
  'push': {
    'sender_id': '91028945737',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true,
        'alert': true
      },
      'android': {
        'iconColor': '#343434',
        'vibrate': true,
        'sound': true
      }
    }
  }
};
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MyApp,
    FooterDirectionComponent,
    HeaderComponent,
    PageTitleComponent,
    PostContainerComponent,
    YoutubePlayerComponent,
    AdvertisementPage,
    AppCalculatorPage,
    AppDateCalculatorPage,
    AppDateCountdownPage,
    AppFlashlightPage,
    AppUnitConverterPage,
    ChangePwPage,
    ContactPage,
    ForgotPwPage,
    ForumAddPage,
    ForumInfoPage,
    ForumListPage,
    ForumNoticeListPage,
    ForumYoutubeListPage,
    HomePage,
    LinksPage,
    LoginPage,
    PhoneInfoPage,
    PhoneListPage,
    PlansPage,
    QuickToolPage,
    SignupPage,
    SplashPage,
    StoreInfoPage,
    StoreListPage,
    UserProfilePage,
    PhoneNumberPipe,
    SearchFilterPipe,
    YoutubePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MomentModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdvertisementPage,
    AppCalculatorPage,
    AppDateCalculatorPage,
    AppDateCountdownPage,
    AppFlashlightPage,
    AppUnitConverterPage,
    ChangePwPage,
    ContactPage,
    ForgotPwPage,
    ForumAddPage,
    ForumInfoPage,
    ForumListPage,
    ForumNoticeListPage,
    ForumYoutubeListPage,
    HomePage,
    LinksPage,
    LoginPage,
    PhoneInfoPage,
    PhoneListPage,
    PlansPage,
    QuickToolPage,
    SignupPage,
    SplashPage,
    StoreInfoPage,
    StoreListPage,
    UserProfilePage
  ],
  providers: [
    CallNumber,
    Device,
    Firebase,
    Flashlight,
    InAppBrowser,
    LaunchNavigator,
    PhotoViewer,
    SplashScreen,
    StatusBar,
    AdvertisementService,
    ForumService,
    HelperService,
    LinkService,
    PhoneService,
    PlanService,
    StoreService,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {
}
