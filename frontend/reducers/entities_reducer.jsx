import { combineReducers } from "redux";
import usersReducers from "./users_reducer";
import currentPriceReducer from './current_price_reducer';


const entitiesReducer = combineReducers({
    users: usersReducers,
    currentPrice: currentPriceReducer,
});


export default entitiesReducer;