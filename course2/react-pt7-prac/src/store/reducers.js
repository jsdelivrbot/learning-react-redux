import * as actionType from './actions';

const initialState = {
    persons: []
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_PERSON:
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: 'Max',
                age: Math.floor( Math.random() * 40 )
            }
            return {
                ...state,
                persons: [...state.persons, newPerson]
            }
        case actionType.REMOVE_PERSON:
            console.log(action.payload);
            return {
                ...state,
                persons: state.persons.filter(person => person.id !== action.payload.id)
            }
        default:
            return state
    }
}

export default reducer;