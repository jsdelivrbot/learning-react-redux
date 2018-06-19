import {SAVE_COMMENT} from "actions/types";
import {FETCH_COMMENTS} from "../actions/types";
import axios from 'axios';

export default function(state=[],action){
    switch(action.type){
        case SAVE_COMMENT:
            return [...state,action.payload];
        case FETCH_COMMENTS:
            const comments = action.payload.data.map(ele=> ele.name);
            console.log(comments);
            return [...state,...comments];
        default:
            return state;
    }
}