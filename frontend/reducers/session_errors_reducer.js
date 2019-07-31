import { 
    RECEIVE_CURRENT_USER, 
    RECEIVE_SESSION_ERRORS, 
    CLEAR_ERRORS } from "../actions/session_actions";

// listen for 2 action types"

const sessionErrorsReducer = (oldState=[], action) => {
    Object.freeze(oldState);
    // let newState;
    // debugger

    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:        // sets errors to the action's errors
            return [].concat(action.errors);
            // debugger

        case RECEIVE_CURRENT_USER:          // clears the errors
            return [];

        case CLEAR_ERRORS:
            return [];

        default:
            return oldState;
    }
}


export default sessionErrorsReducer;