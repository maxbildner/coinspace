import { connect } from 'react-redux';
import CurrencyTableItem from './currency_table_item';
import { fetchCurrentPrice } from '../../actions/currency_actions';

const mapStateToProps = (state) => {

    return ({
        price: null,
        changePct24HR: null
    });
}


const mapDispatchToProps = (dispatch) => {
    return ({
        fetchCurrentPrice: (symbol) => dispatch(fetchCurrentPrice(symbol))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyTableItem)