import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media.component';
import { LibraryService } from './services/library.service';
import { MediaService } from './services/media.service';
import { MediaNavigationComponent } from './components/media-navigation/media-navigation.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';

const material = [
  CdkTreeModule,
  MatIconModule,
  MatButtonModule,
  MatTreeModule
]

@NgModule({
  declarations: [MediaComponent, MediaNavigationComponent],
  imports: [
    CommonModule,
    MediaRoutingModule,
    ...material
  ],
  providers: [
    LibraryService,
    MediaService
  ]
})
export class MediaModule { }
