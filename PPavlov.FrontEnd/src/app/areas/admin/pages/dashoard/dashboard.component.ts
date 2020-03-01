import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectLoading } from 'src/app/store/selectors/loading.selector';
import { selectUsername } from 'src/app/store/selectors/auth.selector';
import { logoutUserAction } from 'src/app/store/actions/auth.actions';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private store: Store<AppState>
  ) { }

  loading$ = this.store.pipe(select(selectLoading))
  username$ = this.store.pipe(select(selectUsername))

  logout() {
    this.store.dispatch(logoutUserAction());
  }
}
