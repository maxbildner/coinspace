import React from 'react';
import GreetingContainer from './greeting_container';
import { Route, Switch } from 'react-router-dom';
import SignupFormContainer from './signup_form_container';
import LoginFormContainer from './login_form_container';
// import LogoutFormContainer from './signup_form_container';

// ? functional component that will wrap all other components (but app will be wrapped in root component?)
const App = () => {
   return (
		<>
			<header>
				<h1>COIN SPACE</h1>
				<GreetingContainer />
			</header>

			<Switch>
				<Route exact path='/signup' component={SignupFormContainer} />
				<Route exact path='/login' component={LoginFormContainer} />
			</Switch>
		</>
   );
};

export default App;