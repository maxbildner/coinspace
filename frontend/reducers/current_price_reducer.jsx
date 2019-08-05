import { RECEIVE_PRICE } from '../actions/currency_actions';


export default (oldState={}, action) => {
    Object.freeze(oldState);
    let newState;

    switch (action.type) {
        case RECEIVE_PRICE:

            return action.payload;
        default:
            return oldState;
    }
}

/// new reducer
// listen for receive price action
// export default (oldState={}, action) => {
//     Object.freeze(oldState);
//     let newState;

//     switch (action.type) {
//         case RECEIVE_PRICE:

//             return action.payload;
//         default:
//             return oldState;
//     }
// }

