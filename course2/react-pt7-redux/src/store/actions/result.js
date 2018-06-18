import * as actionTypes from './actionTypes';
//sync part
import {STORE} from "./actionTypes";

export const saveResult =(res)=>{
    return {
        type:actionTypes.STORE,
        result:res
    }
}

//async part
export const storeResult= (value) =>{
    //usually thunk just return(dispatch), getState is additional param
    return (dispatch, getState) =>{
        setTimeout(()=>{
            dispatch(saveResult(value));
        },2000);
    };
}

export const deleteResult= (value) =>{
    return {
        type:actionTypes.REMOVE,
        id:value
    }
}