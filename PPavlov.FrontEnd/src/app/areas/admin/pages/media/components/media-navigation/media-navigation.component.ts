import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryNode } from '../../models/library-node';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Store } from '@ngrx/store';

import * as fromSelectors from '../../store/media.selectors';
import * as fromActions from '../../store/media.actions';

@Component({
  selector: 'app-media-navigation',
  templateUrl: './media-navigation.component.html',
  styleUrls: ['./media-navigation.component.scss']
})
export class MediaNavigationComponent implements OnInit {
  public libraries$: Observable<LibraryNode[]>;
  public library$: Observable<LibraryNode>;

  public libraryNodeTreeControl: NestedTreeControl<LibraryNode>;

  constructor(private _store: Store<{}>) { }

  public ngOnInit(): void {
    this.libraryNodeTreeControl = new NestedTreeControl<LibraryNode>(n => n.children);

    this.libraries$ = this._store.select(fromSelectors.selectLibraries);
    this.library$ = this._store.select(fromSelectors.selectLibrary);
  }

  public hasChild(_: number, node: LibraryNode): boolean {
    return !!node.children && node.children.length > 0;
  }

  public nodeSelected(node: LibraryNode): void {
    this._store.dispatch(fromActions.SetLibraryAction({ library: node }))
  }
}
