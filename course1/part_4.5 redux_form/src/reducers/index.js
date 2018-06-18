import { combineReducers } from 'redux';
import postReducer from './reducer_posts';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    posts: postReducer,
    form:formReducer //this 'form' key has to be FORM not FORMS
});

export default rootReducer;
