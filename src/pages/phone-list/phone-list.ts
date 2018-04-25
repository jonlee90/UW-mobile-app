import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

import { PhoneInfoPage } from '../phone-info/phone-info';
import { PhoneService } from '../../providers/phone';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { HelperService } from '../../providers/helper';

import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'page-phone-list',
  templateUrl: 'phone-list.html',
})
export class PhoneListPage {
  private phones: any;
  private filterCat: string;
  private selectedCat: string = 'All';
  private listCounter: number = 0;
  private searchValue: any;
  private searchTerm = new Subject<any>();

  constructor(public navCtrl: NavController,
              public actionSheetCtrl: ActionSheetController,
              public phoneService: PhoneService,
              public photoViewer: PhotoViewer,
              public helperService: HelperService) {
      //when searchTerm value changes, filter the phones and grab the searched results
    this.phoneService.searchObserve(this.searchTerm, 0).subscribe((res: any) => {
      this.phones = res.list;
      this.listCounter = 1;
    });
  }

  ionViewWillEnter() {
    if(!this.phones) {
      this.helperService.showLoader('Loading...'); 
      this.phoneService.getPhones(this.listCounter).subscribe((res: any) => {
        this.phones = res.list;
        this.helperService.dismissLoader();
        this.listCounter++;
      });
    }
  }
  onFilterClick() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Filter Phones',
      buttons: [
          {
          text: 'All',
          role: 'destructive',
          handler: () => {
              this.filterCat = null;
              this.selectedCat = 'All';
              this.getFilteredPhones();
          },
          icon: 'logo-buffer',
          cssClass: "allPhone"
          },{
          text: 'New',
          handler: () => {
              this.filterCat = 'is_new';
              this.selectedCat = 'New';
              this.getFilteredPhones();
          },
          icon: "md-phone-portrait",
          cssClass: "newPhone"
          },{
          text: 'On Sale',
          handler: () => {
              this.filterCat = 'price_sale';
              this.selectedCat = 'Sale';
              this.getFilteredPhones();
          },
          icon: 'pricetag',
          cssClass: 'salePhone'
          },{
          text: 'Recommended',
          handler: () => {
              this.filterCat = 'is_hot';
              this.selectedCat = 'Recommended';
              this.getFilteredPhones();
          },
          icon: 'ios-star',
          cssClass: "recPhone"
          },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
              
          }
          }
      ]
    });
    actionSheet.present();
  }
  onPhotoClick(photo: string) {
    this.photoViewer.show(photo);
  }
  onPhoneView(phone: any) {
    this.navCtrl.push(PhoneInfoPage, {
      phone: phone
    });
  }
  getFilteredPhones() {
    this.listCounter = 0;
    this.phoneService.saveFilter(this.filterCat);
    this.phoneService.searchPhones(this.searchValue, this.listCounter, this.filterCat).subscribe((res: any) => {
      if(res.list) {
        this.phones = res.list;
        this.listCounter++;
      }
    });
  }
  getMorePhones(event: any) {
    if((this.searchValue == '' || !this.searchValue ) && (!this.filterCat || this.filterCat == null)) {
      this.phoneService.getPhones(this.listCounter).subscribe((res: any) => {
        if(res.list) {
          this.phones.push(...res.list);
          this.listCounter++;
          event.complete();
        }
      });
    }else {
      this.phoneService.searchPhones(this.searchValue, this.listCounter, this.filterCat).subscribe((res: any) => {
        if(res.list) {
          this.phones.push(...res.list);
          this.listCounter++;
          event.complete();
        }
      });
    }
  }
  calcTop(photo: any): string { 
    // Center photo vertically
    let halfHeight = photo.height / 2;
    return 'calc(50% - ' + halfHeight + 'px)';
  }
  selectFilterColor(): string {
    if(this.selectedCat == 'New') {
        return '#387ef5';
    }else if(this.selectedCat == 'Sale') {
        return '#f33';
    }else if(this.selectedCat == 'Recommended') {
        return 'rgb(248, 160, 28)';
    }else {
        return 'black';
    }
  }
}
