import { User } from 'src/app/models/user.model';

export interface AuthState {
    user: User,
    authenticated: boolean,
    token: string
}

export const initialState: AuthState = {
    user: null,
    authenticated: false,
    token: null
}

