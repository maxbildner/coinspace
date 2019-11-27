import React from "react";
import { Link, NavLink, Route } from 'react-router-dom';



// renders nav header
class NavBarComponent extends React.Component {
	constructor(props) {
		super(props);

		this.renderLoggedInLinks = this.renderLoggedInLinks.bind(this)
		this.renderLoggedOutLinks = this.renderLoggedOutLinks.bind(this)
		this.renderSessionLinks = this.renderSessionLinks.bind(this);
	}

	renderLoggedInLinks() {
		return (<>
			<li>
				<NavLink activeClassName="nav-selected" to="/prices">Prices</NavLink>
			</li>
			<li>
				<NavLink to="/dashboard">Dashboard</NavLink>
			</li>
			{/* <li>
				<NavLink to="/">Home</NavLink>
			</li> */}
			<li >
				<Link onClick={this.props.logoutUser} to="/" >Sign Out</Link>
			</li>
		</>
		);
	}

	renderLoggedOutLinks() {
		return (<>
			<li>
				<NavLink activeClassName="nav-selected" to="/prices">Prices</NavLink>
			</li>
			<li>
				<NavLink to='/login' activeClassName="nav-selected">Sign In</NavLink>
			</li>
			<li>
				<NavLink to='/signup' activeClassName="nav-selected">Sign Up</NavLink>
			</li>
		</>
		);
	}


	renderSessionLinks() {
		if (this.props.currentUser) {
			return this.renderLoggedInLinks();
		} else {
			return this.renderLoggedOutLinks();
		}
	}


	render() {
		return (
			<>
				<div id="nav-container">
					<Link to='/' id="nav-logo">
						<img src="https://i.imgur.com/wLiW760.png" alt="coinspace-logo" />
					</Link>
					<div id="nav-sections">
						<div className="nav-section" id="nav-left">
								<ul>
									<li>
									<a  
										href="https://github.com/maxbildner/coinspace"
										target="_blank">Github</a>
									</li>
									<li>
										<a  
											href="https://www.linkedin.com/in/maxbildner/"
											target="_blank"
											>LinkedIn</a>
									</li>
									<li>
										<a  
											href="https://angel.co/maxbildner"
											target="_blank"
											>AngelList</a>
									</li>
									{/* <li>
										<NavLink activeClassName="nav-selected" to="/prices">Prices</NavLink>
									</li> */}
								</ul>
						</div>

						<div className="nav-section" id="nav-right">
							<ul>
								{this.renderSessionLinks()}
							</ul>
						</div>
					</div>
				</div>
			</>
		);
	}
}


export default NavBarComponent;