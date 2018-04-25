import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class LinkService {
  private linkUrl: string = 'http://45.58.0.252/ultimatevzw/links-get.php';

  constructor(public http: Http) {}

  getLinks(listCounter: number) {
    return this.http.get(this.linkUrl + '?listCounter=' + listCounter)
                    .map((res: Response) => res.json());
  }

}
