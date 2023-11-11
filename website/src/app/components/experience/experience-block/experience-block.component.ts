import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/services/data.service';

@Component({
  selector: 'app-experience-block',
  templateUrl: './experience-block.component.html',
  styleUrls: ['./experience-block.component.scss'],
})
export class ExperienceBlockComponent implements OnInit {

  @Input() experience: Experience = {
    timeRange: '',
    title: '',
    company: '',
    description: '',
    attributes: []
  };

  constructor() {}

  ngOnInit() {}

}
