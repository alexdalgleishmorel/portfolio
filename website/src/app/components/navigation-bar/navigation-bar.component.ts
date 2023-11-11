import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {

  public navOptions: NavOption[] = [
    NavOption.ABOUT, NavOption.EXPERIENCE, NavOption.PROJECTS
  ];
  public selectedNavOption: NavOption = NavOption.ABOUT;

  constructor() { }

  ngOnInit() {}

  public getSelectedNavOption(): NavOption {
    return this.selectedNavOption;
  }

  public setSelectedNavOption(option: NavOption) {
    this.selectedNavOption = option;
  }

  public isNavOptionSelected(option: NavOption): boolean {
    return this.selectedNavOption === option;
  }
}

export enum NavOption {
  ABOUT = 'ABOUT',
  EXPERIENCE = 'EXPERIENCE',
  PROJECTS = 'PROJECTS'
}
