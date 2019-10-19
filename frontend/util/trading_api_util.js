// buyCurrency = POST (create) request to create a new wallet transaciton, but will also update (PUT) wallet value
// AJAX request is made to heroku backend, 
// This function is called in thunk action middleware, then dispatched in MDP in container of trading component
export const buyCurrency = (purchaseInfo) => {      // ex. purchaseInfo = { user_id: 11, symbol: 'BTC', quantity: 1.0, price: 8000 };
  return $.ajax({
    method: 'POST',
    url: 'api/wallet_transactions',
    data: { purchaseInfo }
    // ex. 
    // data: {
    //   user_id: 11,
    //   currency_symbol: 'BTC',
    //   quantity: 1.0,
    //   price: 7000.0
    // }
  });
}

// ex. 
// promise = buyCurrency(purchaseInfo)
// promise.responseJSON == { cash_balance: 3000, portfolio: {'BTC': 1} }