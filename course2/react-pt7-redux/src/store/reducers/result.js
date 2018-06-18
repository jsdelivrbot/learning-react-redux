import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
const initialState = {
    results: []
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE:
            return updateObject(state, {results: state.results.concat({id: new Date(), value: action.result})});
        case actionTypes.REMOVE:
            /*const newArray = [...state.results];
            newArray.splice(id,1);*/
            const updatedArray = state.results.filter(ele => ele.id !== action.id);
            return updateObject(state, {results:updatedArray});
        default:
            return state;
    }
};
export default reducer;