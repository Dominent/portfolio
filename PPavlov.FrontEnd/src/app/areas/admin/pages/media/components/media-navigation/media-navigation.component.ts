import { Component, OnInit, ViewChild, Predicate } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryNode } from '../../models/library-node';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

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

  public hasNoContent = (_: number, node: LibraryNode) => node.value === null;

  public nodeSelected(node: LibraryNode): void {
    this._store.dispatch(fromActions.SetLibraryAction({ library: node }))
  }

  addNewItem(node: LibraryNode) {
    this.libraries$.pipe(first()).subscribe(([root]) => {
      const librariesRoot = JSON.parse(JSON.stringify(root));

      const library = DFS(librariesRoot, (library) => JSON.stringify(library.value) === JSON.stringify(node.value));

      library.children = [...library.children, { value: null, children: [] }]

      this._store.dispatch(fromActions.getAllLibrariesSuccessAction({ libraries: [librariesRoot] }))
    })
  }

  public addLibrary() {

  }
}

const DFS = (root: LibraryNode, predicate: Predicate<LibraryNode>): LibraryNode => {
  const stack: LibraryNode[] = [];
  stack.push(root);

  while (stack.length != 0) {
    var node = stack.pop();

    if (predicate(node)) {
      return node;
    }

    for (var child of node.children) {
      stack.push(child);
    }
  }

  return null;
}
