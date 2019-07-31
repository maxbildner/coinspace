// RECEIVE_CURRENT_USER - use merge to add the action's user to the state 
// and set the key to the id of the user

import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const usersReducers = (oldState={}, action) => {
    Object.freeze(oldState);
    let newState;

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            newState = merge({}, state, { [action.user.id]: action.user });    // add the action's user to the state and set the key to the id of the user.
            return newState;

        default:
            return oldState;
    }
};

export default usersReducers;