import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store, select } from '@ngrx/store';
import { selectAuthenticated } from 'src/app/store/selectors/auth.selector';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        public store: Store<AppState>,
        private _router: Router
    ) { }

    public authenticated$ = this.store.pipe(select(selectAuthenticated));
    public canActivate$ = this.authenticated$.pipe(map((isAuthenticated) => {
        if (isAuthenticated) {
            return true
        } else {
            this._router.navigate(['/auth', 'login']);
        }

        return false;
    }));

    public canActivate(): Observable<boolean> {
        return this.canActivate$;
    }
}