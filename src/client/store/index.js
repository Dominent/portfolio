import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import errorReducer from './reducers/errorReducer';
import galleryReducer from './reducers/galleryReducer';

export const configure = (preloadedState = {}) => {
    const middleware = [thunk];

    const rootReducer = combineReducers({
        auth: authReducer,
        errors: errorReducer,
        gallery: galleryReducer
    });

    return createStore(
        rootReducer,
        preloadedState,
        compose(applyMiddleware(...middleware))
    );
}
