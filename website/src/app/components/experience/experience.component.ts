import { Component, OnInit } from '@angular/core';
import { DataService, Experience } from 'src/app/services/data.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent  implements OnInit {

  public experiences: Experience[];

  constructor(private dataService: DataService) {
    this.experiences = dataService.experiences;
  }

  ngOnInit() {}
}
