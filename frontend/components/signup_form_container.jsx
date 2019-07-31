import { connect } from 'react-redux';
import SessionForm from './session_form'
import { signup, clearErrors, login } from '../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
    return ({
        errors: state.errors.session,
        formType: 'signup'
    });
};


const mapDispatchToProps = (dispatch) => {
    return ({
        processForm: (user) => dispatch(signup(user)),
        clearErrors: () => dispatch(clearErrors()),
        demoLogin: (user) => dispatch(login(user))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)
