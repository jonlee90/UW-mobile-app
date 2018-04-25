import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ForumService } from '../../providers/forum';
@Component({
  selector: 'page-forum-info',
  templateUrl: 'forum-info.html',
})
export class ForumInfoPage {
  private selectedForum: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public forumService: ForumService) {
  }
  ngOnInit() {
    this.selectedForum = this.navParams.get('forum');
    this.forumService.increaseForumCount(this.selectedForum.id).subscribe((res)=> {});
  }
}
