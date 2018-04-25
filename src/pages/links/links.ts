import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { LinkService } from '../../providers/link';

@Component({
  selector: 'page-links',
  templateUrl: 'links.html',
})
export class LinksPage {
  private links: any;
  private listCounter: number = 0;
  private displayFooter: string = 'off';

  constructor(public navCtrl: NavController,
              public linkService: LinkService,
              public browser: InAppBrowser,
              public platform: Platform) {
              
  }

  ionViewWillEnter() {    
    if(!this.links) {
      this.linkService.getLinks(this.listCounter).subscribe((res: any) => {
        this.links = res.list;
        this.listCounter++;
        if(this.links.length > 10) {
          this.displayFooter = 'on';
        }
      });
    }
  }            
  onLinkClick(link: string) {
    var checkHttp = link.includes('http');
    var url;
    if(checkHttp) {
        url = link;
    }else {
        url = 'http://' + link;
    }
    this.platform.ready().then(() => {
        this.browser.create(url, '_system');
    });
  }
  getMoreLinks(event: any) {
    this.linkService.getLinks(this.listCounter).subscribe((res: any) => {
      if(res.list) {
        this.links.push(...res.list);
        this.listCounter++;
        event.complete();
      }
    });
  }
}
        