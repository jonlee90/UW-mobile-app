import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HelperService {
  private loader: Loading;
  private currentImage: number = 0;
  private yelpRatingUrl: string = 'http://45.58.0.252/ultimatevzw/backend/img/yelp/';
  private menuClicked = new Subject<any>();

  constructor(public alertCtrl: AlertController,
              public loadCtrl: LoadingController) {}
  checkLoaded(loaded) {
    if(loaded) {
      return '';
    }else {
      return 'hidden';
    }
  }
  dismissLoader() {
    if(this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }
  getYelpRating(yelp: any): string {
    if(!yelp) {
      return; 
    }
    if(yelp.rating < 1) {
      return this.yelpRatingUrl + 'small_0@2x.png';
    }else {
      var yelpRateFloor = Math.floor(yelp.rating);
      var RatingImg = 'small_' + yelpRateFloor;
      if(yelp.rating  > yelpRateFloor) {
        RatingImg = RatingImg + '_half';
      }
      return this.yelpRatingUrl + RatingImg + '@2x.png';
    }
  }
  lastImageLoaded(images: string[]) {
    // return true after the last image loads
    // Instead of using index, i just manually incremented count because images were loading in different order
    let imageCount = images.length;
    this.currentImage++;
    if(this.currentImage == imageCount) {
        this.currentImage = 0;
        return true;
    }
  }
  isOdd(value: number): boolean{
    if(value%2 == 0) {
        return false;
    }else {
        return true;
    }
  }
  showPopup(title: string, text: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
          {
              text: 'OK'
          }
      ]
    });
    alert.present();
  }
  showLoader(text: string) {
    this.loader = this.loadCtrl.create({
      content: text
    });
    this.loader.present();
  }   
  onMenuClick(page) {
    this.menuClicked.next(page);
  }
  checkIfMenuClicked() {
    return this.menuClicked.asObservable();
  }
}
