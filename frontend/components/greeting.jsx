import React from 'react';
import { Link } from 'react-router-dom';
// Greeting Component == page we see if user is logged in
// Greeting Component == Home Page/Splash Page we see if user is logged out

// ? funcitonl component
const Greeting = (props) => {

    if (props.currentUser) {                                         // if USER is logged in
        return (
            <>
                <h1>Hello, {props.currentUser.email}</h1>
                <button onClick={props.logoutUser}>Log Out</button>
            </>
        )
    } else {  
        return null;                                                      // if USER NOT logged in
        // return (
        //     <>
        //         <Link to='/signup'>Sign Up</Link>
        //         <br/>
        //         <Link to='/login'>Login</Link>
        //     </>
        // )
    }
}


export default Greeting;
