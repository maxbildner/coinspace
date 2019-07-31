// entry file!
import React from 'react';
import ReactDOM from 'react-dom';
// import { signup, login, logout } from './util/session_api_util';
import { signup, login, logout } from './actions/session_actions';
import configureStore from './store/store';
import Root from './components/root';


document.addEventListener('DOMContentLoaded', ()=> {
    
    const store = configureStore();

    // TESTING
    window.signup = signup;
    window.login = login;                   // user == { email: 'harry@gmail.com', password: '12345678' }
    window.logout = logout;
    window.dispatch = store.dispatch;
    window.getState = store.getState;
    // TESTING


    const root = document.getElementById('root');           // ? app/views/static_pages/root.html.erb
    ReactDOM.render(<Root store={store}/>, root);
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

// window.dispatch(login(user))