import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], fields: any[], value: string, filterCat: string): any[] {
    if(!value && !filterCat) {
      return items;
    }else if(!value && filterCat) {
      return items.filter(item => {
        var cont = false;
        for(let i = 0; i < fields.length; i++) {
          if(filterCat == 'price_sale') {
            if(item[filterCat]) {
              cont = true;
            }else {
              cont = false;
            }
          }else {
            cont = item[filterCat] > 0; 
          }
        }
        return cont;
      });
    }
    value = value.toUpperCase();
    return items.filter(item => {
      var cont = false;
      for(let i = 0; i < fields.length; i++) {
          cont = item[fields[i]].toUpperCase().indexOf(value) !== -1;
          if(filterCat && cont) {
            if(filterCat == 'price_sale') {
              if(item[filterCat]) {
                cont = true;
              }else {
                cont = false;
              }
            }else {
              cont = item[filterCat] > 0; 
            }
          }
          if(cont) {
              break;
          }
      }
      return cont;
    });
  }
}
