import React from "react";
import { Link } from 'react-router-dom';
// import coinspaceLogo from "../../app/assets/images/coinspaceLogo.PNG";			// doesn't work without special webpack thingie

// A simple presentational component that renders nav header just for login only
class NavLoginComponent extends React.Component {

	render() {

	
		return (
			<>
					<div id="nav-login-container">
						<Link to='/'>
							<img src="https://i.imgur.com/wLiW760.png" id="nav-login-logo" alt="coinspace-logo"/>
						</Link>

						<div id="nav-login-right">
							<ul>
									<li>
										<a href="#">Products</a>
									</li>
									<li>
										<a href="#">Help</a>
									</li>
									<li>
										<a href="#">Price</a>
									</li>
									<li>
										<Link to='/login'>Sign In</Link>
									</li>
									<li>
										<Link to='/signup'>Sign Up</Link>
									</li>
							</ul>
						</div>
					</div>
			</>
		);
	}
}


export default NavLoginComponent;