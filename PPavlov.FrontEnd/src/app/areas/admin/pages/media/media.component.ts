import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaService } from './services/media.service';
import { Store } from '@ngrx/store';

import * as fromActions from './store/media.actions';
import { MediaOutputModel } from './models/media-output-model';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  @ViewChild(MatSidenav)
  public sidenav: MatSidenav;

  public media: MediaOutputModel;

  constructor(private _store: Store<{}>) {}

  public ngOnInit(): void {
    this._store.dispatch(fromActions.getAllLibrariesRequestAction())
  }

  public mediaSelected(model: MediaOutputModel) {
    this.media = model;
    this.sidenav.open();
  }
}
