// buyCurrency = POST (create) request to create a new wallet transaciton, but will also update (PUT) wallet value
// AJAX request is made to heroku backend, 
// This function is called in thunk action middleware, then dispatched in MDP in container of trading component
export const buyCurrency = (purchaseInfo) => {
  return $.ajax({
    method: 'POST',
    url: 'api/trade',
    data: { purchaseInfo }
    // ex. 
    // data: {
    //   user_id: 11,
    //   currency_symbol: 'BTC',
    //   quantity: 1.0
    // }
  });
}