import { RECEIVE_PRICE } from '../actions/currency_actions';
import { merge } from 'lodash';

export default (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState;

    // debugger
    switch (action.type) {
        case RECEIVE_PRICE:
            // action.payload == {price: 11645.05, changePct24HR: -1.0162682825865141}

            newState = merge({}, 
                oldState, 
                {[action.payload.symbol]: action.payload})
            // newState == {price: 11645.05, changePct24HR: -1.0162682825865141}
            
            // debugger
            return newState;
        default:
            return oldState;
    }
}

