import { combineReducers } from 'redux';
import postReducer from './reducer_posts';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    posts: postReducer,
    forms:formReducer
});

export default rootReducer;
