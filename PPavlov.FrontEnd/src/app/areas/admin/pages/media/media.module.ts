import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media.component';
import { LibraryService } from './services/library.service';
import { MediaService } from './services/media.service';
import { MediaNavigationComponent } from './components/media-navigation/media-navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { CovalentBreadcrumbsModule } from '@covalent/core/breadcrumbs';
import { MatDividerModule } from '@angular/material/divider';
import { StoreModule } from '@ngrx/store';
import { mediaFeatureKey } from './store/media.state';
import { mediaReducer } from './store/media.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MediaEffects } from './store/media.effects';
import { MediaListComponent } from './components/media-list/media-list.component';

const material = [
  MatIconModule,
  MatButtonModule,
  MatTreeModule,
  MatDividerModule
]

const covalent = [
  CovalentBreadcrumbsModule
]

@NgModule({
  declarations: [MediaComponent, MediaNavigationComponent, MediaListComponent],
  imports: [
    CommonModule,
    MediaRoutingModule,
    StoreModule.forFeature(mediaFeatureKey, mediaReducer),
    EffectsModule.forFeature([MediaEffects]),
    ...material,
    ...covalent
  ],
  providers: [
    LibraryService,
    MediaService
  ]
})
export class MediaModule { }
