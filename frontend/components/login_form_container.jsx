import { connect } from 'react-redux';
import { login, clearErrors } from '../actions/session_actions';
import SessionForm from './session_form';



const mapStateToProps = (state, ownProps) => {
    
    return ({
        // errors: errors.session,
        errors: state.errors.session,
        formType: 'Sign In'
    });
};


const mapDispatchToProps = (dispatch) => {
    return ({
        processForm: (user) => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors()), 
        demoLogin: (user) => dispatch(login(user))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)

