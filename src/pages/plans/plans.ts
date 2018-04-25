import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlanService } from '../../providers/plan';

@Component({
  selector: 'page-plans',
  templateUrl: 'plans.html',
})
export class PlansPage {
  private plans: any;
  private selectedPlan: any;
  private plan: any;
  constructor(public navCtrl: NavController,
              public planService: PlanService) {}

  ionViewWillEnter() {   
    if(!this.plans) {
      this.planService.getPlans().subscribe((res: any) => {
        if(res.list) {
          this.plans = res.list;
          this.selectedPlan = this.plans[0];
        }
      });
    }
  }

}
