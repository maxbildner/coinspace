import { connect } from 'react-redux';
import CurrencyTableItem from './currency_table_item';
import { fetchCurrentPrice } from '../../actions/currency_actions';

const mapStateToProps = (state, ownProps) => {
    // const { price, changePct24HR, id } = state.entities.cryptocurrencies;
    // BEFORE^ WRONG

    // AFTER CORRECT
    const { price, changePct24HR, id } = state.entities.cryptocurrencies[ownProps.symbol] || {}

    // debugger
    return ({
        price,
        changePct24HR,
        id
    })
    
}


const mapDispatchToProps = (dispatch) => {
    return ({
        fetchCurrentPrice: (symbol) => dispatch(fetchCurrentPrice(symbol))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyTableItem)