import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavOption } from '../content/content.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {

  public navOptions: NavOption[] = [
    NavOption.ABOUT, NavOption.EXPERIENCE, NavOption.PROJECTS
  ];
  @Input() public selectedNavOption: NavOption = NavOption.ABOUT;
  @Output() public selectedNavOptionChange = new EventEmitter<NavOption>;

  constructor() { }

  ngOnInit() {}

  public getSelectedNavOption(): NavOption {
    return this.selectedNavOption;
  }

  public setSelectedNavOption(option: NavOption) {
    this.selectedNavOption = option;
    this.selectedNavOptionChange.emit(option);
  }

  public isNavOptionSelected(option: NavOption): boolean {
    return this.selectedNavOption === option;
  }
}
