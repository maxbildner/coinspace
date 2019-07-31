import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';
import Greeting from './greeting';                      
// Greeting Component == page we see if user is logged in
// Greeting Component == Home Page/Splash Page we see if user is logged out

const mapStateToProps = (state) => {                    // msp gets hit everytime state changes
    let userId = state.session.id;
    // debugger

    return ({
        currentUser: state.entities.users[userId]       // pass to GreetingContainer as props currentUser
    });
};


const mapDispatchToProps = (dispatch) => {              // mdp only gets hit a single time when we mount component
    return ({
        logoutUser: () => dispatch(logout())
    });
};



export default connect(mapStateToProps, mapDispatchToProps)(Greeting)