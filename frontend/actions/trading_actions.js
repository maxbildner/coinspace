import * as TradingAPIUtil from '../util/trading_api_util';
export const RECEIVE_BUY_DATA = 'RECEIVE_BUY_DATA';
export const RECEIVE_SELL_DATA = 'RECEIVE_SELL_DATA';


// THUNK ACTION CREATORS  
export const buyCurrency = (purchaseInfo) => {              // called in Trading Component (given access by MDP in container)

  return (dispatch) => {

    return TradingAPIUtil.buyCurrency(purchaseInfo).then(

      (response) => {
        return dispatch(receieveBuyData(response))          // ? response == { id: 17, email: 'demo@gmail.com', cash_balance: 3000, portfolio: {'BTC': 1} }
      }
    );
  };
};




export const sellCurrency = (saleInfo) => {

  return (dispatch) => {

    return TradingAPIUtil.sellCurrency(saleInfo).then(

      (response) => {
        // debugger
        return dispatch(receiveSellData(response))
      }
    );
  };
};





// ACTION CREATORS - will hit users reducer!! 
const receieveBuyData = (userData) => {                     // ? userData == { id: 17, email: 'demo@gmail.com', cash_balance: 3000, portfolio: {'BTC': 1} }
  // debugger
  return ({
    type: RECEIVE_BUY_DATA,
    userData
  });
}

const receiveSellData = (userData) => {
  // debugger

  return({
    type: RECEIVE_SELL_DATA,
    userData
  });
}