import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import errorReducer from './reducers/errorReducer';
import galleryReducer from './reducers/galleryReducer';
import projectReducer from './reducers/projectReducer';

export const configure = (preloadedState = {}) => {
    const middleware = [thunk];

    const rootReducer = combineReducers({
        errors: errorReducer,
        gallery: galleryReducer,
        projects: projectReducer
    });

    return createStore(
        rootReducer,
        preloadedState,
        compose(applyMiddleware(...middleware))
    );
}
