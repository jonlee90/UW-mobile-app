import { Injectable, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'youtube'
})
@Injectable()
export class YoutubePipe {
    constructor(public dom: DomSanitizer) {}

    transform(value, args) {
        return this.dom.bypassSecurityTrustResourceUrl(value);
    }
}