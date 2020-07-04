import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output()
  public mediaSelect: EventEmitter<MediaOutputModel> = new EventEmitter<MediaOutputModel>();

  public columns: string[] = ['name', 'updatedAt', 'type', 'size'];
  public media$: Observable<MediaOutputModel[]>;

  constructor(private _store: Store<{}>) { }

  public ngOnInit(): void {
    this.media$ = this._store.select(fromSelectors.selectMedia);
  }

  public mediaSelected(model: MediaOutputModel) {
    this.mediaSelect.emit(model);
  }
}
