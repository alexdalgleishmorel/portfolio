import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  
  public selectedNavOption: NavOption = NavOption.ABOUT;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        fragment = fragment.toUpperCase();
        if (fragment === NavOption.ABOUT) {
          this.setSelectedNavOption(NavOption.ABOUT);
        }
        else if (fragment === NavOption.EXPERIENCE) {
          this.setSelectedNavOption(NavOption.EXPERIENCE);
        }
        else if (fragment === NavOption.PROJECTS) {
          this.setSelectedNavOption(NavOption.PROJECTS);
        } else {
          this.router.navigate([], { fragment: undefined });
        }
      }
    })
  }

  public isAboutSelected(): boolean {
    return this.selectedNavOption === NavOption.ABOUT;
  }

  public isExperienceSelected(): boolean {
    return this.selectedNavOption === NavOption.EXPERIENCE;
  }

  public isProjectsSelected(): boolean {
    return this.selectedNavOption === NavOption.PROJECTS;
  }

  public setSelectedNavOption(option: NavOption) {
    this.selectedNavOption = option;
    this.router.navigate([], { fragment: option.toLowerCase() });
  }
}

export enum NavOption {
  ABOUT = 'ABOUT',
  EXPERIENCE = 'EXPERIENCE',
  PROJECTS = 'PROJECTS'
}
