// listens for 2 action types:
// RECEIVE_CURRENT_USER - sets id to the action's user.id
// LOGOUT_CURRENT_USER - sets id to null

import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';

const predefinedState = { id: null }

const sessionReducer = (oldState = predefinedState, action) => {
    Object.freeze(oldState);
    // debugger

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { id: action.user.id }

        case LOGOUT_CURRENT_USER:
            return { id: null }
            
        default: 
            return oldState;
    };
};

export default sessionReducer;