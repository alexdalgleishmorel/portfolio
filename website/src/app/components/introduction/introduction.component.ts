import { Component } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent {
  showSocialMedia: boolean = false;

  constructor() {}

  displayMedia() {
    this.showSocialMedia = true;
  }
}
