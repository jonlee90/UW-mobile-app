import { Component, Input, trigger, transition, style, animate, state } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'comp-footer-direction',
  animations: [
    trigger(
      'myAnimation',
      [
        state('on', style({ display: "block" })),
        state("off", style({ display: "none" })),
        transition(
        'off => on', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('100ms', style({transform: 'translateY(0)', 'opacity': .9}))
        ]
      ),
      transition(
        'on => off', [
          style({transform: 'translateY(0)', 'opacity': .9}),
          animate('250ms', style({transform: 'translateY(100%)', 'opacity': 0})),
        ]
      )]
    )
  ],
  templateUrl: 'footer-direction.html',
})  
export class FooterDirectionComponent {
  @Input() displayFooter: string = 'on';
  @Input() typeOfPage: string;
  private currentLang: string;

  constructor(public translate: TranslateService) {
    this.currentLang = this.translate.currentLang;
  }

}
