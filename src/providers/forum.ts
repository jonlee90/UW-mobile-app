import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Device } from '@ionic-native/device';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class ForumService {
  private forumGetUrl: string = 'http://45.58.0.252/ultimatevzw/forums-get.php?cust_id=';
  private forumAddUrl: string = 'http://45.58.0.252/ultimatevzw/forums-add.php';
  private forumNoticesYoutube: string = 'http://45.58.0.252/ultimatevzw/forums-notices-youtube.php?groupId=';
  private forumGetHomeUrl: string = 'http://45.58.0.252/ultimatevzw/forums-home.php?groupId=';
  private forumCheckCount: string = 'http://45.58.0.252/ultimatevzw/forum-checkcount.php?forumId=';
  private forumSearchUrl: string = 'http://45.58.0.252/ultimatevzw/forum-search.php?cust_id=';
  private deviceUid: string;

  constructor(public http: Http,
              public platform: Platform,
              public device: Device) {
      
  }

  getForums(id: number, listCounter: number) {
    return this.http.get(this.forumGetUrl + id + '&listCounter=' + listCounter)
                    .map((res: Response) => res.json());
  }
  getForumNoticesYoutube(id: number, listCounter: number) {
    return this.http.get(this.forumNoticesYoutube + id + '&listCounter=' + listCounter)
                    .map((res: Response) => res.json());
  }
  getHomeForums(id: number) {
    return this.http.get(this.forumGetHomeUrl + id)
                    .map((res: Response) => res.json());
  }
  addForum(values: URLSearchParams) {
    return this.http.post(this.forumAddUrl, values)
                    .map((res: Response) => res.json());
  }
  increaseForumCount(forumId: number) {
    this.deviceUid = this.device.uuid;
    return this.http.get(this.forumCheckCount + forumId + '&deviceId=' + this.deviceUid)
                    .map((res: Response) => res.json());
  }
  searchForums(term: string, id: number, listCounter: number) {
    if(!term) {
        term = '';
    }
    return this.http.get(this.forumSearchUrl + id + '&listCounter=' + listCounter + '&searchValue=' + term)
                    .map((res: Response) => res.json());
  }
  searchObserve(terms: Observable<any>, id: number, listCounter: number) {
    return terms.debounceTime(400)
                .distinctUntilChanged()
                .switchMap(term => this.searchForums(term, id, listCounter));
  }
}
