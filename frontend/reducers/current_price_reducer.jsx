import { RECEIVE_PRICE } from '../actions/currency_actions';


export default (oldState={}, action) => {
    Object.freeze(oldState);

    switch (action.type) {
        case RECEIVE_PRICE:
            return action.payload;
        default:
            return oldState;
    }
}