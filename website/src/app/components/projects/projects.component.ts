import { Component, OnInit } from '@angular/core';
import { DataService, Project } from 'src/app/services/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  public projects: Project[];

  constructor(private dataService: DataService) {
    this.projects = dataService.projects;
  }
}
