import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { IntroductionComponent } from '../components/introduction/introduction.component';
import { ContentComponent } from '../components/content/content.component';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';
import { AboutComponent } from '../components/about/about.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ExperienceBlockComponent } from '../components/experience/experience-block/experience-block.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    AboutComponent,
    ContentComponent,
    ExperienceComponent,
    ExperienceBlockComponent,
    HomePage,
    IntroductionComponent,
    NavigationBarComponent,
    ProjectsComponent
  ]
})
export class HomePageModule {}
