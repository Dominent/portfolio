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
import { CovalentSidesheetModule } from '@covalent/core/sidesheet';
import { MatDividerModule } from '@angular/material/divider';
import { StoreModule } from '@ngrx/store';
import { mediaFeatureKey } from './store/media.state';
import { mediaReducer } from './store/media.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MediaEffects } from './store/media.effects';
import { MediaListComponent } from './components/media-list/media-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MediaHeaderComponent } from './components/media-header/media-header.component';

const material = [
  MatIconModule,
  MatButtonModule,
  MatTreeModule,
  MatDividerModule,
  MatTableModule,

  MatToolbarModule,
  MatSidenavModule
]

const covalent = [
  CovalentBreadcrumbsModule,
  CovalentSidesheetModule 
]

@NgModule({
  declarations: [MediaComponent, MediaNavigationComponent, MediaListComponent, MediaHeaderComponent],
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
