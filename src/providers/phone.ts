import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class PhoneService {
  private phoneUrl: string = 'http://45.58.0.252/ultimatevzw/phones-get.php?listCounter=';
  private searchPhoneUrl: string = 'http://45.58.0.252/ultimatevzw/phones-search.php?listCounter=';
  private savedFilter: string;

  constructor(public http: Http) {}

  getPhones(listCounter: number) {
    return this.http.get(this.phoneUrl + listCounter)
                    .map((res: Response) => res.json());
  }
  searchPhones(term: string, listCounter: number, filter: string) {
    return this.http.get(this.searchPhoneUrl + listCounter + '&searchValue=' + term + '&filter=' + filter)
                    .map((res: Response) => res.json());
  }

  searchObserve(terms: Observable<any>, listCounter: number) {
    return terms.debounceTime(400)
                .distinctUntilChanged()
                .switchMap(term => this.searchPhones(term, listCounter, this.savedFilter));
  }
  saveFilter(filter: string) {
    this.savedFilter = filter;
  }
}
