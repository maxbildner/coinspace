import React from "react";
import { Link, NavLink } from 'react-router-dom';

// renders nav header just for greeting path='/' only
class NavGreetingComponent extends React.Component {

    render() {
        return (
            <>
                <div id="nav-greeting-container">
                    <Link to='/'>
                        <img src="https://i.imgur.com/frPaqWU.png" id="nav-greeting-logo" alt="coinspace-logo" />
                    </Link>

                    <div id="nav-greeting-right">
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
                                <NavLink to='/login'>Sign In</NavLink>
                            </li>
                            <li>
                                <NavLink to='/signup' activeClassName="nav-selected-greeting">Sign Up</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}


export default NavGreetingComponent;