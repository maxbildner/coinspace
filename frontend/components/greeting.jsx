import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import NavGreetingComponent from './navbars/nav_greeting';

// Greeting Component == page we see if user is logged in
// Greeting Component == Home Page/Splash Page we see if user is logged out

// ? funcitonl component
const Greeting = (props) => {

	if (props.currentUser) {                                         // if USER is logged in
			return (
					<>
						<h1>Hello, {props.currentUser.email}</h1>
						<button onClick={props.logoutUser}>Log Out</button>
					</>
			)
	} else { 																														// if USER NOT logged in														
		return(
			<>
				<Route exact path="/" component={NavGreetingComponent} />																	                                                 
				<Route exact path="/signup" component={NavGreetingComponent} />																	                                                 
			</>
		
		); 
	}
}


export default Greeting;



///* <Switch>
// 				<AuthRoute exact path='/signup' component={SignupFormContainer} />
// 				<AuthRoute exact path="/login" component={LoginFormContainer} />
// 			</Switch> */