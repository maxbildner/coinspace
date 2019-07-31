// entry file!
import React from 'react';
import ReactDOM from 'react-dom';
import { signup, login, logout } from './util/session_api_util';
import configureStore from './store/store';


document.addEventListener('DOMContentLoaded', ()=> {
    
    const store = configureStore();

    // TESTING
    window.signup = signup;
    window.login = login;
    window.logout = logout;
    window.dispatch = store.dispatch;
    window.getState = store.getState;
    // TESTING


    const root = document.getElementById('root');           // ? app/views/static_pages/root.html.erb
    ReactDOM.render(<h1>COIN SPACE</h1>, root);
});


// NOTE* ex. state as of (7/1/19):
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