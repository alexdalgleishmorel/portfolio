import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/services/data.service';

@Component({
  selector: 'app-project-block',
  templateUrl: './project-block.component.html',
  styleUrls: ['./project-block.component.scss'],
})
export class ProjectBlockComponent {
  @Input() project: Project = {
    year: '',
    title: '',
    description: '',
    attributes: [],
    githubLink: '',
    demoLink: '',
    liveDemoLink: '',
  };

  constructor(private router: Router) {}

  onSelect() {}
}
