import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  
  public selectedNavOption: NavOption = NavOption.ABOUT;

  constructor() { }

  ngOnInit() {}

  public isAboutSelected(): boolean {
    return this.selectedNavOption === NavOption.ABOUT;
  }

  public isExperienceSelected(): boolean {
    return this.selectedNavOption === NavOption.EXPERIENCE;
  }

  public isProjectsSelected(): boolean {
    return this.selectedNavOption === NavOption.PROJECTS;
  }
}

export enum NavOption {
  ABOUT = 'ABOUT',
  EXPERIENCE = 'EXPERIENCE',
  PROJECTS = 'PROJECTS'
}
