import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';



// functional component
const Auth = ({ component: Component, path, loggedIn, exact }) => {
	// let { component: Component, path, loggedIn, exact } = props;

	return (
		<Route path={path} exact={exact} render={(props) => (
			!loggedIn? (
				<Component {...props} />
			) : (
				<Redirect to='/dashboard' />
			)
		)}/>
	);
};

const mapStateToProps = (state) => {
	return ({
		loggedIn: Boolean(state.session.id)
	});
};



const Protected = ({ component: Component, path, loggedIn, exact }) => (
	<Route path={path} exact={exact} render={(props) => (
		loggedIn ? (
			<Component {...props} />
		) : (
				<Redirect to="/" />
			)
	)} />
);


export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth))
