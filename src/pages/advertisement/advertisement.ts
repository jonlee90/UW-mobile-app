import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { AdvertisementService } from '../../providers/advertisement';
import { HelperService } from '../../providers/helper';
@Component({
  selector: 'page-advertisement',
  templateUrl: 'advertisement.html',
})
export class AdvertisementPage {
  @ViewChild(Slides) slides: Slides;
  private advertisements: any;
  private loaded: boolean;

  constructor(public navCtrl: NavController,
              public adService: AdvertisementService,
              public photoViewer: PhotoViewer,
              public helperService: HelperService) {
  }
  ionViewWillEnter() {    
    if(!this.advertisements) {
      this.adService.getAdvertisements().subscribe((res: any) => {
          this.advertisements = res.ad;
      });
    }
  }
  onPhotoClick(photo: string) {
    this.photoViewer.show(photo);
  }
  slideChanged() {
    this.slides.resize();
  }
  imageLoaded() {
    // update the slide after the last image loads so that the slides work properly
    this.loaded = this.helperService.lastImageLoaded(this.advertisements);
    if(this.loaded) {
        this.slides.update();
    }
  }
  checkLoaded() {
    // if all the images are loaded, hide the spinner and show all the image
    return this.helperService.checkLoaded(this.loaded);
  }
}
