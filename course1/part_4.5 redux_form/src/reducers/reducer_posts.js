import {FETCH_POST, FETCH_POSTS, DELETE_POST} from "../actions/index";
import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case DELETE_POST:
            return _.omit(state, action.payload);
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_POST:
            /*const post = action.payload.data;
            const newState={...state};
            newState[post.id] = post;
            return newState;
            es5 way, below is es6 way , [action.payload.data.id] = making a new key using the data.id
            */
            return {...state, [action.payload.data.id]: action.payload.data}
        default:
            return state;
    }
}