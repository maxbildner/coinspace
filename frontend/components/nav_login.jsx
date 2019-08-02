import React from "react";
// import coinspaceLogo from "../../app/assets/images/coinspaceLogo.PNG";

// A simple presentational component that renders nav header just for login only
class NavLoginComponent extends React.Component {

	render() {
		return (
			<>
					<div id="nav-login-container">
						<a>
						<img src="https://i.imgur.com/wLiW760.png" id="nav-login-logo" alt="coinspace-logo"/>
						</a>
	
						<div id="nav-login-right">
							<ul>
									<li>
										<a href="#">Products</a>
										<a href="#">Help</a>
										<a href="#">Price</a>
										<a href="#">Sign In</a>
										<a href="#">Sign Up</a>
									</li>
							</ul>
						</div>
					</div>
			</>
		);
	}
}


export default NavLoginComponent;