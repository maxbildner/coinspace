import React from 'react';
import GreetingContainer from './greeting_container';
import { Route, Switch } from 'react-router-dom';
import SignupFormContainer from './signup_form_container';
import LoginFormContainer from './login_form_container';
// import LogoutFormContainer from './signup_form_container';
import { AuthRoute } from '../util/route_util';

// ? functional component that will wrap all other components (but app will be wrapped in root component?)
const App = () => {
   return (
		<>
			<header>
				<h1>COIN SPACE</h1>
				<GreetingContainer />
			</header>

			<Switch>
				<AuthRoute exact path='/signup' component={SignupFormContainer} />
				<AuthRoute exact path="/login" component={LoginFormContainer} />
			</Switch>
		</>
   );
};

export default App;