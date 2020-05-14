import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    imports: [
        HomeRoutingModule
    ],
    declarations: [
        HeaderComponent,
        HomeComponent
    ]
})
export class HomeModule {
}