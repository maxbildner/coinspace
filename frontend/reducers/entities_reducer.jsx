import { combineReducers } from "redux";
import usersReducers from "./users_reducer";



const entitiesReducer = combineReducers({
    users: usersReducers
});


export default entitiesReducer;