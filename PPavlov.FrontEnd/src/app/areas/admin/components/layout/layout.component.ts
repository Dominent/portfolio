import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectLoading } from '@app/store/selectors/loading.selector';
import { selectUsername } from '@app/store/selectors/auth.selector';
import { Observable } from 'rxjs';
import { logoutUserAction } from '@app/store/actions/auth.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public loading$: Observable<boolean>;
  public username$: Observable<string>;

  constructor(private _store: Store<{}>) { }

  public ngOnInit(): void {
    this.loading$ = this._store.pipe(select(selectLoading));
    this.username$ = this._store.pipe(select(selectUsername));
  }

  public logout() {
    this._store.dispatch(logoutUserAction());
  }
}
