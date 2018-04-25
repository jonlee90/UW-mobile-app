import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Geolocation } from 'ionic-native';
declare var google;
@Injectable()
export class StoreService {
  private storeUrl: string = 'http://45.58.0.252/ultimatevzw/stores-get.php';
  private storesAccUrl: string = 'http://45.58.0.252/ultimatevzw/stores-get-account.php';
  public updatedLocation = new Subject<string>();
  private location: any = {
    latitude: 0,
    longitude: 0
  };

  constructor(public http: Http) {}

  getStores(coords) {
    return this.http.get(this.storeUrl + '?lat=' + coords.latitude + '&lng=' + coords.longitude)
                    .map((res: Response) => res.json());
  }
  getStoresAccount() {
    return this.http.get(this.storesAccUrl)
                    .map((res: Response) => res.json());
  }
  getLocationCoords() {
    return this.updatedLocation.asObservable();
  }
  getMyLocation() {
    return Geolocation.getCurrentPosition();  
  }
  convertToCoords(value: any) {
    let self = this;
    let geo = new google.maps.Geocoder;
    geo.geocode({address: value}, function(results, status) {
      if (status === 'OK') {
        // results is array of addresses, use first result
        if (results[0]) {
          self.location.longitude = results[0].geometry.location.lng();
          self.location.latitude = results[0].geometry.location.lat();   
          self.updatedLocation.next(self.location);
        } else {
          self.updatedLocation.next('error');
        }
      }else {
        self.updatedLocation.next(status);
      }
    });
  }
}
