import { combineReducers } from "redux";
import sessionReducer from './session_reducer';
import errorsReducer from "./errors_reducer";
import entitiesReducer from "./entities_reducer";

const rootReducer = combineReducers({
    entites: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer
});

export default rootReducer;

// ex. state:
// {
//     entities: {
//         users: { }
//     },
//     session: {
//         id: null,
//   },
//     errors: {
//         session: []
//     }
// }