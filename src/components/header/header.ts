import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, Navbar } from 'ionic-angular';

import { UserService } from '../../providers/user';
@Component({
  selector: 'comp-header',
  templateUrl: 'header.html',
})
export class HeaderComponent {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Navbar) navBar: Navbar;
  
  
  constructor(public navCtrl: NavController,
              public userService: UserService) {
  }
  onLogoClick() {
    var name = this.navCtrl.getActive().name;
    if(name == 'HomePage') {
        return;
    }
    this.navCtrl.popToRoot();
  }
}
