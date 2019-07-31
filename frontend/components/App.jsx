import React from 'react';
import GreetingContainer from './greeting_container';
import { Route, Switch } from 'react-router-dom';

// ? functional component that will wrap all other components (but app will be wrapped in root component?)
const App = () => {
   return (
		<>
			<header>
				<h1>COIN SPACE</h1>
				<GreetingContainer />
			</header>

			{/* <Switch>
				<Route exact path='/login' component={LoginFormContainer} />
				<Route exact path='/login' component={SignupFormContainer} />
			</Switch> */}
		</>
   );
};

export default App;