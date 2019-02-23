import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import errorReducer from './reducers/errorReducer';
import galleryReducer from './reducers/galleryReducer';

// const store = createStore(rootReducer, initialState,
//     compose(applyMiddleware(...middleware)), 
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ ())

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
        compose(applyMiddleware(...middleware)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ ()
    );
}
