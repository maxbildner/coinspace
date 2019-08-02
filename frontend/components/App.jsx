import React from 'react';
import GreetingContainer from './greeting_container';
import { Link, Route, Switch } from 'react-router-dom';
import SignupFormContainer from './session_forms/signup_form_container';
import LoginFormContainer from './session_forms/login_form_container';
// import LogoutFormContainer from './signup_form_container';
import { AuthRoute } from '../util/route_util';
import RouteChange from './route_change';

// ? functional component that will wrap all other components (but app will be wrapped in root component?)
const App = () => {
   return (
		<>
			<GreetingContainer />
			

			<Switch>
				<AuthRoute exact path='/signup' component={SignupFormContainer} />
				<AuthRoute exact path="/login" component={LoginFormContainer} />
			</Switch>
		</>
   );
};

// Switch component returns only the first one matching the route path
export default App;


// Old: (8/1/19)
// const App = () => {
//    return (
// 		<>
// 			<header>
// 				<Link to="/">
// 					<h1 className="logo">coinspace</h1>
// 				</Link>
// 				<GreetingContainer />
// 			</header>

// 			<RouteChange />
// 			<Switch>
// 				<AuthRoute exact path='/signup' component={SignupFormContainer} />
// 				<AuthRoute exact path="/login" component={LoginFormContainer} />
// 			</Switch>
// 		</>
//    );
// };

