import { createAction, props } from '@ngrx/store';
import { LoginInput } from 'src/app/models/input/login-input.model';
import { Login } from 'src/app/models/login.model';

export const loginUserAction = createAction('LOGIN_USER', props<{ payload: LoginInput }>());
export const loginUserSuccessAction = createAction('LOGIN_USER_SUCCESS', props<{ payload: Login }>());
export const loginUserFailureAction = createAction('LOGIN_USER_FAILURE', props<{ payload: any }>());
export const logoutUserAction = createAction('LOGOUT_USER');