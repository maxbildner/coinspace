import React from "react";
import { Link } from 'react-router-dom';

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


export default NavGreetingComponent;