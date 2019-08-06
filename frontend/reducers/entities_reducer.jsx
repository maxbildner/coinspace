import { combineReducers } from "redux";
import usersReducers from "./users_reducer";
import currentPriceReducer from './current_price_reducer';
import cryptocurrenciesReducer from './currencies_reducer';


const entitiesReducer = combineReducers({
    users: usersReducers,
    cryptocurrencies: cryptocurrenciesReducer,
    // currentPrice: currentPriceReducer,
});


export default entitiesReducer;