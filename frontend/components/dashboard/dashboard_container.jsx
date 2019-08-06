import { connect } from 'react-redux';
import Dashboard from './dashboard';

const mapStateToProps = (state) => {
    return ({
        state
    });
}


const mapDispatchToProps = (dispatch) => {
    return ({
        test: {}
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)