// import { signup, login, logout } from '../util/session_api_util';
import * as SessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

// export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';


// THUNK ACTION CREATORS
export const login = (user) => {                    // user == { email: 'harry@gmail.com', password: '12345678' }
    return (dispatch) => {
        return SessionAPIUtil.login(user).then(
            (response) => {                         
                // debugger                            // response == {id: 11, email: "demo_user@gmail.com", cash_balance: 10000, portfolio: {…}}
                return dispatch(receiveCurrentUser(response));
            }, 
            (error) => {
                return dispatch(receiveErrors(error.responseJSON))              // ? responseJSON
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
            },
            (errors) => {
                
                return dispatch(receiveErrors(errors.responseJSON))
            }
        );
    };
};



// ACTION CREATORS
const receiveCurrentUser = (user) => {   // takes in object
    // debugger
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

const receiveErrors = (errors) => {     // takes in array
    return ({
        type: RECEIVE_SESSION_ERRORS,
        errors
    });
};


export const clearErrors = () => {
    return ({
        type: CLEAR_ERRORS
    })
}

// to test this on the window:
// LOGIN
// harry = { email: 'harry@gmail.com', password: '12345678' }
// dispatch(login(harry));     //=> should see state change         // ? why does state get wiped clean after I log a user in, and then refresh manually?

