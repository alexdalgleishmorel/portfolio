import { Component, EventEmitter, Output } from '@angular/core';

import { NavOption } from '../content/content.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  @Output() optionSelected: EventEmitter<NavOption> = new EventEmitter<NavOption>();

  constructor() {}

  projectsSelected() {
    this.optionSelected.emit(NavOption.PROJECTS);
  }

  experienceSelected() {
    this.optionSelected.emit(NavOption.EXPERIENCE);
  }
}
