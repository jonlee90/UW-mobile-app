import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

import { PhotoViewer } from '@ionic-native/photo-viewer';

import { HelperService } from '../../providers/helper';
@Component({
  selector: 'page-phone-info',
  templateUrl: 'phone-info.html',
})
export class PhoneInfoPage {
  @ViewChild('slides') slides: Slides;
  @ViewChild('slideContainer') slideContainer: ElementRef;
  private selectedPhone: any;
  private containerHeight: string;
  private loaded: boolean;

  constructor(public navCtrl: NavController, 
              public helperService: HelperService,
              public navParams: NavParams,
              public photoViewer: PhotoViewer) {
    this.selectedPhone = this.navParams.get('phone');
  }
  ionViewDidEnter() {
    // Adjust the height of picture container  
    let eleHeight = this.slideContainer.nativeElement.offsetHeight;
    let upHeight = eleHeight + 50;
    if(upHeight > 100) {
        this.containerHeight = upHeight + 'px';
    }else {
        this.containerHeight = '260px';
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
    this.loaded = this.helperService.lastImageLoaded(this.selectedPhone.photos);
    if(this.loaded) {
        this.slides.update();
    }
  }
  checkLoaded() {
    // if all the images are loaded, hide the spinner and show all the image
    return this.helperService.checkLoaded(this.loaded);
  }
  
}
