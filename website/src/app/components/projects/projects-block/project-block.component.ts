import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/services/data.service';

@Component({
  selector: 'app-project-block',
  templateUrl: './project-block.component.html',
  styleUrls: ['./project-block.component.scss'],
})
export class ProjectBlockComponent implements OnInit {

  @Input() project: Project = {
    title: '',
    description: '',
    attributes: []
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  onSelect() {
    if (this.project.submoduleName) {
      this.router.navigate([this.project.submoduleName]);
    }
  }
}
