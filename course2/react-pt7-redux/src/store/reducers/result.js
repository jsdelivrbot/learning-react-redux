import * as actionTypes from '../action';

const initialState = {
    results: []
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE:
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.result})
            }
        case actionTypes.REMOVE:
            /*const newArray = [...state.results];
            newArray.splice(id,1);*/
            const updatedArray = state.results.filter(ele => ele.id !== action.id);
            return {
                ...state,
                results: updatedArray
            }
        default:
            return state;
    }
};
export default reducer;