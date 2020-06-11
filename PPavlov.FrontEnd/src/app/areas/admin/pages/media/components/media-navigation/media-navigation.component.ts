import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryNode } from '../../models/library-node';
import { NestedTreeControl } from '@angular/cdk/tree';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-media-navigation',
  templateUrl: './media-navigation.component.html',
  styleUrls: ['./media-navigation.component.scss']
})
export class MediaNavigationComponent implements OnInit {
  public libraries$: Observable<LibraryNode[]>;
  public libraryNodeTreeControl: NestedTreeControl<LibraryNode>;

  constructor(private _libraryService: LibraryService) { }

  ngOnInit(): void {
    this.libraryNodeTreeControl = new NestedTreeControl<LibraryNode>(n => n.children);
    this.libraries$ = this._libraryService.getAll();
  }

  public hasChild(_: number, node: LibraryNode): boolean {
    return !!node.children && node.children.length > 0;
  }
}
