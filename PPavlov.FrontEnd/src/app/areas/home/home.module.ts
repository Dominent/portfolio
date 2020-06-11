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
import { HomePortfolioComponent } from './components/home-portfolio/home-portfolio.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

const material = [
    MatButtonModule,
    MatCardModule,
    MatGridListModule
]

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FontAwesomeModule,
        ...material
    ],
    declarations: [
        HomeComponent,
        HomeHeaderComponent,
        HomeHeroComponent,
        HomeExperienceComponent,
        HomeExperienceItemComponent,
        SafePipe,
        HomePortfolioComponent
    ]
})
export class HomeModule {
}