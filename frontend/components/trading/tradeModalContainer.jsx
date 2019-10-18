import { connect } from 'react-redux';  
import TradeModal from './tradeModal';

const mapStateToProps = (state, ownProps) => {
  debugger
  const userId = state.session.id;
  const cashBalance = state.entities.users[userId].cash_balance || null;
  const portfolio = state.entities.users[userId].portfolio || null;
  

  return ({
    cashBalance,
    portfolio,
    userId
  });
};


const mapDispatchToProps = (dispatch) => {

};


export default connect(mapStateToProps, null)(TradeModal);
