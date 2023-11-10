import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { IntroductionComponent } from '../components/introduction/introduction.component';
import { ContentComponent } from '../components/content/content.component';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    ContentComponent,
    HomePage,
    IntroductionComponent,
    NavigationBarComponent
  ]
})
export class HomePageModule {}
