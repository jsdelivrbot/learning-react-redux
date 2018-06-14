export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE = 'STORE';
export const REMOVE = 'REMOVE';

//can receive payload in () =>{}
export const increment = () =>{
    return {
        type:INCREMENT
    }
};

export const decrement = () =>{
    return {
        type:DECREMENT
    }
};

export const add = (value) =>{
    return {
        type:ADD,
        val:value
    }
};

export const subtract = (value) =>{
    return {
        type:SUBTRACT,
        val:value
    }
}

export const storeResult= (value) =>{
    return {
        type:STORE,
        result:value
    }
}

export const deleteResult= (value) =>{
    return {
        type:STORE,
        id:value
    }
}