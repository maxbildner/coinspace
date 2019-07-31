// import { signup, login, logout } from '../util/session_api_util';
import * as SessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';


// THUNK ACTION CREATORS
export const login = (user) => {                    // user == { email: 'harry@gmail.com', password: '12345678' }
    return (dispatch) => {
        return SessionAPIUtil.login(user).then(
            (response) => {                         // ? response == user?
                return dispatch(receiveCurrentUser(response));
            }
        );       
    };
};

export const logout = () => {
    return (dispatch) => {
        return SessionAPIUtil.logout().then(
            () => {
                return dispatch(logoutCurrentUser());
            }
        );
    };
};

export const signup = (user) => {
    return (dispatch) => {
        return SessionAPIUtil.signup(user).then(
            (response) => {
                return dispatch(receiveCurrentUser(response));
            }
        );
    };
};



// ACTION CREATORS
const receiveCurrentUser = (user) => {
    return ({
        type: RECEIVE_CURRENT_USER,
        user
    });
};

const logoutCurrentUser = () => {
    return ({
        type: LOGOUT_CURRENT_USER
    });
};

