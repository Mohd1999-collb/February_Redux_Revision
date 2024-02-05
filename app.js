import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";


// Action Type
const INCREAMENT = "INCREAMENT";
const DECREAMENT = "DECREAMENT";
const RESET = "RESET";

// Action Creator
const increament = (value) => {
    return {
        type: INCREAMENT,
        payload: value
    }
}

const decreament = () => {
    return {
        type: DECREAMENT,
        payload: 1
    }
}

const reset = () => {
    return {
        type: RESET,
        payload: 0
    }
}

// Action Reducer
const initial = 0;
const counterReducer = (state = initial, action) => {
    switch (action.type) {
        case INCREAMENT:
            return state + action.payload;
        case DECREAMENT:
            return state - action.payload;
        case RESET:
            return action.payload;
        default:
            return state;
    }
}

// Create store
const store = createStore(counterReducer, applyMiddleware(logger.default));

// Middleware
store.subscribe(()=>{
    console.log("Updated value is --> ", store.getState());
})
let count = 0;
let interval = setInterval(() => {
    count++;
    store.dispatch(increament(50));
    if (count == 5) {
        store.dispatch(reset());
        clearInterval(interval);
    }
}, 2000)


