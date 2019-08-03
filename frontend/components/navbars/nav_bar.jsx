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
                <NavLink to="">Dashboard</NavLink>
            </li>
            <li>
                <NavLink to="">Settings</NavLink>
            </li>
            <li >
                <Link onClick={this.props.logoutUser} to="/" >Sign Out</Link>
            </li>
        </>
        );
    }

    renderLoggedOutLinks() {
        return (<>
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
                                    <NavLink activeClassName="nav-selected" to="">About</NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName="nav-selected" to="">Products</NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName="nav-selected" to="">Help</NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName="nav-selected" to="">Price</NavLink>
                                </li>
                                
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