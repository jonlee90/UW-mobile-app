import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AdvertisementService {
  private adUrl: string = 'http://45.58.0.252/ultimatevzw/advertisements-get.php';
  private splashUrl: string = 'http://45.58.0.252/ultimatevzw/splash-get.php/?id=';
  constructor(public http: Http) {}

  getSplashPage() {
    return this.http.get(this.splashUrl)
                    .map((res: Response) => res.json());
  }
  getAdvertisements() {
    return this.http.get(this.adUrl)
                    .map((res: Response) => res.json());
  }
getSpecificSplashPage(id) {
    return this.http.get(this.splashUrl + id)
                    .map((res: Response) => {
                            if(res){
                                return res.json();
                            }else { 
                                return 0; }
                    });
  }

}
