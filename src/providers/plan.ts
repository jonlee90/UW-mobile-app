import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class PlanService {
  private planUrl: string = 'http://45.58.0.252/ultimatevzw/plans-get.php';

  constructor(public http: Http) {}

  getPlans() {
    return this.http.get(this.planUrl)
                    .map((res: Response) => res.json());
  }

}
