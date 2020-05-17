import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeExperienceComponent } from './components/home-experience/home-experience.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { HomeComponent } from './home.component';
import { HomeExperienceItemComponent } from './components/home-experience-item/home-experience-item.component';
import { CommonModule } from '@angular/common';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FontAwesomeModule
    ],
    declarations: [
        HomeComponent,
        HomeHeaderComponent,
        HomeHeroComponent,
        HomeExperienceComponent,
        HomeExperienceItemComponent,
        SafePipe
    ]
})
export class HomeModule {
}