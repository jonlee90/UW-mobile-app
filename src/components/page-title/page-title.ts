import { Component, Input } from '@angular/core';


@Component({
  selector: 'comp-page-title',
  templateUrl: 'page-title.html',
})
export class PageTitleComponent {
  @Input() title: string;
  
  constructor() {}

}