import { Pipe } from '@angular/core';

@Pipe({
    name: 'phoneNumber'
})

export class PhoneNumberPipe {
  constructor() {}

  transform(value) {
    var viewVal = value.trim().replace(/^\+/, '');
    viewVal = viewVal.replace(/[^0-9]/g, '').slice(0, 11);
    var code, area, number;
    switch(viewVal.length) {
      case 1:
      case 2:
      case 3:
        area = viewVal;
        break;
      case 11: 
        code = viewVal.slice(0, 1);
        area = viewVal.slice(1, 4);
        number = viewVal.slice(4);
        break;
      default: 
        area = viewVal.slice(0, 3);
        number = viewVal.slice(3);
    }
    if(code) {
      if(number.length > 3) {
        number = number.slice(0, 3) + '-' + number.slice(3,7);
      }else {
        number = number;
      }
      return (code + "-" + area + "-" + number).trim().slice(0, 14);    
    }else if(!code) {
      if(number.length > 3) {
        number = number.slice(0, 3) + '-' + number.slice(3,7);
      }else {
        number = number;
      }
      return (area + "-" + number).trim().slice(0, 13);    
    }else {
      return "(" + area;
    }
  }
}