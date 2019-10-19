import { connect } from 'react-redux';  
import TradeModal from './tradeModal';
import { buyCurrency, sellCurrency } from '../../actions/trading_actions';


const mapStateToProps = (state, ownProps) => {
  // debugger
  const userId = state.session.id;
  const cashBalance = state.entities.users[userId].cash_balance || {};
  const portfolio = state.entities.users[userId].portfolio || {};
  
  return ({
    cashBalance,
    portfolio,
    userId
  });
};


const mapDispatchToProps = (dispatch) => {
  return ({
    buyCurrency: (purchaseInfo) => dispatch(buyCurrency(purchaseInfo)),
    sellCurrency: (saleInfo) => dispatch(sellCurrency(saleInfo))
  });
};


export default connect(mapStateToProps, mapDispatchToProps)(TradeModal);
