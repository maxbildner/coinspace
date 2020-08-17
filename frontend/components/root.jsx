import React from 'react';
import { Provider } from 'react-redux';         // makes redux store available to any nested component wrapped in connect()
import { HashRouter } from 'react-router-dom';  // ? lets us have the front end UI in sync with URL
import App from './App';


// functional component
const Root = ({store}) => {                     // { store } == props
// const Root = (props) => {               
    return (
        <Provider store={store}>
            <HashRouter>                        
                <App/>
            </HashRouter>
        </Provider>
    );
};

export default Root;