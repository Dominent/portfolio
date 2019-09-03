import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store, select } from '@ngrx/store';
import { selectAuthenticated } from 'src/app/store/selectors/auth.selector';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        public store: Store<AppState>
    ) { }

    authenticated$ = this.store.pipe(select(selectAuthenticated))

    public canActivate(): Observable<boolean> {
        return this.authenticated$;
    }
}