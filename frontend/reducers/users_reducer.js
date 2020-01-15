// RECEIVE_CURRENT_USER - use merge to add the action's user to the state 
// and set the key to the id of the user

import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_BUY_DATA, RECEIVE_SELL_DATA } from '../actions/trading_actions';


const usersReducers = (oldState={}, action) => {
	Object.freeze(oldState);
	let newState;
	// debugger

	switch (action.type) {
		case RECEIVE_CURRENT_USER:
			// debugger
			newState = merge({}, oldState, { [action.user.id]: action.user });    		// add the action's user to the state and set the key to the id of the user.
			// debugger
			return newState;

		case RECEIVE_BUY_DATA:
			// action.userData ==  { id: 17, email: 'demo@gmail.com', cash_balance: 3000, portfolio: {'BTC': 1} }
			newState = merge({}, oldState, { [action.userData.id]: action.userData });
			// debugger
			newState[action.userData.id].portfolio = action.userData.portfolio;				// "overwrite" old state portfolio
			debugger
			return newState;

		case RECEIVE_SELL_DATA:
			// action.userData ==  { id: 17, email: 'demo@gmail.com', cash_balance: 3000, portfolio: {'BTC': 1} }
			newState = merge({}, oldState, { [action.userData.id]: action.userData })	// ?! THIS DOES NOT DO A DEEP MERGE?!!!!??
			// debugger
			newState[action.userData.id].portfolio = action.userData.portfolio;				// "overwrite" old state portfolio
			// debugger
			return newState;

		default:
			return oldState;
	}
};

export default usersReducers;