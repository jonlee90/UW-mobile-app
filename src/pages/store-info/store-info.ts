import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Slides } from 'ionic-angular';

import { HelperService } from '../../providers/helper';

declare var google;

@Component({
  selector: 'page-store-info',
  templateUrl: 'store-info.html',
})
export class StoreInfoPage {
  @ViewChild('slides') slides: Slides;
  @ViewChild('map') mapElement;
  @ViewChild('slideContainer') slideContainer: ElementRef;
  private map: any;
  private marker: any;
  private currentStore: any;
  private containerHeight: string;
  private loaded: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public photoViewer: PhotoViewer,
              public launchNavigator: LaunchNavigator,
              public platform: Platform,
              public callNumber: CallNumber,
              public browser: InAppBrowser,
              public helperService: HelperService) {
    this.currentStore = this.navParams.get('store');
  }
  ionViewDidLoad() {
    this.initMap();
  }
  ionViewDidEnter() {
    // Adjust the height of the picture container  
    let eleHeight = this.slideContainer.nativeElement.offsetHeight;
    let upHeight = eleHeight + 50;
    if(upHeight > 100) {
      this.containerHeight = upHeight + 'px';
    }else {
      this.containerHeight = '260px';
    }
  }
  initMap() {
    let latLng = new google.maps.LatLng(this.currentStore.lat, this.currentStore.lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.marker = new google.maps.Marker({position: latLng});
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.marker.setMap(this.map);
  }
  onPhotoClick(photo: string) {
    this.photoViewer.show(photo);
  }
  imageLoaded() {
    // update the slide after the last image loads so that the slides work properly
    this.loaded = this.helperService.lastImageLoaded(this.currentStore.store_imgs);
    if(this.loaded) {
      this.slides.update();
    }
  }
  onLocationClick() {
    this.initMap();
  }
  onAddressClick(store: any) {
    this.platform.ready().then(() => {
      this.launchNavigator.navigate(store.addr + ' ' + store.city + ', ' + store.state + ' ' + store.zip)
                          .then(
                              success => this.helperService.showPopup('Success', 'Launched navigator'),
                              error => this.helperService.showPopup('Error', error)
                          );
    });
  }
  onPhoneClick(number: string) {
    this.platform.ready().then(() => {
      this.callNumber.callNumber(number, true);
    });
  }
  onYelpClick(yelpUrl: string) {
    this.platform.ready().then(() => {
      this.browser.create(yelpUrl, '_system');

    });
  }
  getYelpRating(yelp: any): any {
    return this.helperService.getYelpRating(yelp);
  }
  slideChanged() {
    this.slides.resize();
  }
  checkLoaded() {
    // if all the images are loaded, hide the spinner and show all the image
    return this.helperService.checkLoaded(this.loaded);
  }
  setBackgroundImage(img: string) {
    if(img) {
      return 'url(' + img + ')';
    }else {
      return 'url(assets/img/default-avatar.png)';
    }
  }
}
