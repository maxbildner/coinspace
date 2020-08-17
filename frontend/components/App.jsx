import React from 'react';
import NavBarContainer from './navbars/nav_bar_container';
import { Link, Route, Switch } from 'react-router-dom';
import SignupFormContainer from './session_forms/signup_form_container';
import LoginFormContainer from './session_forms/login_form_container';
// import LogoutFormContainer from './signup_form_container';
// import { AuthRoute, Protected } from '../util/route_util';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import RouteChange from './route_change';
import HomePage from './home_page';
import DashboardContainer from './dashboard/dashboard_container';
import DetailsPage from './currency/details_page';
import PricesPage from './prices/prices_page';
import Footer from './footer';

// ? functional component that will wrap all other components (but app will be wrapped in root component?)
const App = () => {
   return (
		<>
			<RouteChange />
			<NavBarContainer />
			
			<Switch>
				<AuthRoute exact path='/signup' component={SignupFormContainer} />
				<AuthRoute exact path='/login' component={LoginFormContainer} />
				<ProtectedRoute exact path='/dashboard' component={DashboardContainer} />
				<Route exact path="/prices" component={PricesPage}/>
				<Route exact path="/price/:currencyName" component={DetailsPage}/>
				<Route exact path="/" component={HomePage} />
			</Switch>

			 <Footer />
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

