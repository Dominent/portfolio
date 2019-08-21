import { User } from 'src/app/models/user.model';

export interface AuthState {
    user: User,
    authenticated: boolean
}

export const initialState: AuthState = {
    user: null,
    authenticated: false
}

