import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MediaOutputModel } from '../../models/media-output-model';

import * as fromSelectors from '../../store/media.selectors';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {
  public media$: Observable<MediaOutputModel[]>;

  constructor(private _store: Store<{}>) { }

  public ngOnInit(): void {
    this.media$ = this._store.select(fromSelectors.selectMedia);
  }
}
