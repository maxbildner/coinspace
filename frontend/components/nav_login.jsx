import React from "react";
import { Link } from 'react-router-dom';
// import coinspaceLogo from "../../app/assets/images/coinspaceLogo.PNG";			// doesn't work without special webpack thingie

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
									</li>
									<li>
										<a href="#">Help</a>
									</li>
									<li>
										<a href="#">Price</a>
									</li>
									<li>
										<a href="#">Sign In</a>
									</li>
									<li>
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


// //     <>
//         //         <Link to='/signup'>Sign Up</Link>
//         //         <br/>
//         //         <Link to='/login'>Login</Link>
//         //     </>
//         // )
//     }