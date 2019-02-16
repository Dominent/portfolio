import { createStore, combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import galleryReducer from './galleryReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    post: postReducer,
    gallery: galleryReducer
});

const configure = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState);
}

export default configure;

