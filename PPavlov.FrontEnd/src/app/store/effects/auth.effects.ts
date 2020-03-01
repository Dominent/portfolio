import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { loginUserAction, loginUserSuccessAction, loginUserFailureAction, logoutUserAction } from '../actions/auth.actions';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AppState } from '../app.state';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router 
    ) { }

    @Effect()
    loginUserEffect$: Observable<Action> = this.actions$.pipe(
        ofType<ReturnType<typeof loginUserAction>>(loginUserAction.type),
        switchMap((props) => this.authService.login(props.payload)),
        map((res) => loginUserSuccessAction({ payload: res })),
        catchError((err, caught) => {
            this.store.dispatch(loginUserFailureAction(err));
            return caught;
        })
    )

    @Effect({ dispatch: false })
    OnLoginSuccess$ = this.actions$.pipe(
        ofType<ReturnType<typeof loginUserSuccessAction>>(loginUserSuccessAction.type),
        tap(() => this.router.navigate(['/admin']))
    )

    @Effect({ dispatch: false })
    OnLogout$ = this.actions$.pipe(
        ofType<ReturnType<typeof logoutUserAction>>(logoutUserAction.type),
        tap(() => this.router.navigate(['/auth', 'login']))
    )
}