import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppState } from './store/app.state';
import { Store, select } from '@ngrx/store';
import { selectLoading } from './store/selectors/loading.selector';
import { selectAuthenticated, selectUsername } from './store/selectors/auth.selector';
import { logoutUserAction } from './store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private store: Store<AppState>
  ) { }

  loading$ = this.store.pipe(select(selectLoading))
  authenticated$ = this.store.pipe(select(selectAuthenticated))
  username$ = this.store.pipe(select(selectUsername))

  logout() {
    this.store.dispatch(logoutUserAction());
  }
}
