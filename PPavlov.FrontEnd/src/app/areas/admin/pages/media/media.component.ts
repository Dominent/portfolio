import { Component, OnInit } from '@angular/core';
import { MediaService } from './services/media.service';
import { Store } from '@ngrx/store';

import * as fromActions from './store/media.actions';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  constructor(private _store: Store<{}>) {}

  public ngOnInit(): void {
    this._store.dispatch(fromActions.getAllLibrariesRequestAction())
  }
}
