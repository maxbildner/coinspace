// entry file!
import React from 'react';
import ReactDOM from 'react-dom';
import { signup, login, logout } from './util/session_api_util';

document.addEventListener('DOMContentLoaded', ()=> {

    // TESTING
    // window.getState = store.getState;
    // window.dispatch = store.dispatch;
    window.signup = signup;
    window.login = login;
    window.logout = logout;
    // TESTING


    const root = document.getElementById('root');           // ? app/views/static_pages/root.html.erb
    ReactDOM.render(<h1>COIN SPACE</h1>, root);
});