import { combineReducers } from 'redux';
import PostRedcer from './reducer_posts';
import {reducer as formReducer} from 'redux-form';
const rootReducer = combineReducers({
    posts:PostRedcer,
    form:formReducer
});

export default rootReducer;
