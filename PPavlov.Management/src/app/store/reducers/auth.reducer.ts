import { logoutUserAction, loginUserSuccessAction } from '../actions/auth.actions';
import { initialState, AuthState } from '../state/auth.state';
import * as jwt_decode from 'jwt-decode';

export function authReducer(state = initialState, action): AuthState {
    switch (action.type) {
        case loginUserSuccessAction.type: {
            const { token } = action.payload;
            const { email, sub, unique_name } = jwt_decode(token);

            localStorage.setItem('bearer_token', token);

            return {
                ...state,
                authenticated: true,
                user: { id: sub, username: unique_name, email }
            };
        }
        case logoutUserAction.type: {
            localStorage.removeItem('bearer_token')
            
            return {
                ...state,
                authenticated: false,
                user: null
            };
        }
        default:
            return state;
    }
}