import { Component, Input } from '@angular/core';
import { Experience } from 'src/app/services/data.service';

@Component({
  selector: 'app-experience-block',
  templateUrl: './experience-block.component.html',
  styleUrls: ['./experience-block.component.scss'],
})
export class ExperienceBlockComponent {
  @Input() experience: Experience = {
    timeRange: '',
    title: '',
    description: [],
    attributes: [],
    titles: []
  };

  constructor() {}
}
