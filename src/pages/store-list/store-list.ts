import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

import { StoreInfoPage } from '../store-info/store-info';
import { HelperService } from '../../providers/helper';
import { StoreService } from '../../providers/store';

declare var google;
@Component({  
  selector: 'page-store-list',
  templateUrl: 'store-list.html'
})
export class StoreListPage {
  private stores: any;
  private addy: string;
  private displayFooter: string = 'on';
  private coords: any = {
    latitude: 0,
    longitude: 0
  };

  constructor(public navCtrl: NavController,
              public storeService: StoreService,
              public callNumber: CallNumber,
              public platform: Platform,
              public helperService: HelperService) {
    //get the new coords when the user enters new address
    this.storeService.getLocationCoords().subscribe((res: any) => {
      if(res.latitude) {
        this.coords.latitude = res.latitude;
        this.coords.longitude = res.longitude;
        this.getStoreList();
      }else {
        this.helperService.dismissLoader();
        this.helperService.showPopup('Error', 'Invalid Address');
      }
    });
  }
  ionViewWillEnter() {    
    if(!this.stores) {
      this.helperService.showLoader('Loading...');
      this.getStoreList();
    }
  } 
  getStoreList() {
    this.storeService.getStores(this.coords).subscribe((res: any) => { 
      this.stores = res.list;
      this.helperService.dismissLoader();
    });
  }
  getMyLocation(searchBox: any) {
    this.helperService.showLoader('Loading...');
    var self = this;
    this.storeService.getMyLocation().then(
      location => {
        self.coords.latitude = location.coords.latitude;
        self.coords.longitude = location.coords.longitude;
        self.storeService.updatedLocation.next(self.coords);
        let geo = new google.maps.Geocoder;
        let latlng: any = {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        };
        geo.geocode({location: latlng}, function(results, status) {
          if (status === 'OK') {
                // results are array of addresses, use first result
            if (results[0]) {
              let currrentAddy = JSON.stringify(results[0]['formatted_address']);
              let address = currrentAddy.replace(/^"(.*)"$/, '$1');
              self.addy = address;
              searchBox.setFocus();                   
            } else {
              self.helperService.showPopup('Alert', 'Unable to find location');
            }
          }else {
              self.helperService.showPopup('Error', status);
          }
        });
      }
    )
    .catch(
      error => {
        self.helperService.showPopup('Error', error);
      }
    );
  }
  onSearch() {
    this.helperService.showLoader('Loading...');
    this.storeService.convertToCoords(this.addy);
  }
  onPhoneClick(event: MouseEvent, number: string) {
    event.stopPropagation();
    this.platform.ready().then(() => {
      this.callNumber.callNumber(number, true);
    });
  }
  onStoreClick(store: any) {
    this.navCtrl.push(StoreInfoPage, {
      store: store
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
