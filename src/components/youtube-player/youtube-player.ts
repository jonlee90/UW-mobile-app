import { Component, Input } from '@angular/core';

@Component({
  selector: 'comp-youtube-player',
  templateUrl: 'youtube-player.html',
})
export class YoutubePlayerComponent {
  @Input() embedId: string;
  @Input() setHeight: string;
  private youtubeId: string;

  constructor() {}

  ngOnInit() {
      this.youtubeId = 'https://www.youtube.com/embed/' + this.embedId;
  }

}
