import { Component, Input, OnInit } from '@angular/core';
import { DataService, Project } from 'src/app/services/data.service';

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

  constructor() {}

  ngOnInit() {}

}
