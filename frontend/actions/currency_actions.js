import * as CryptoCompare from '../util/prices_util';
import * as CurrencyAPIUtil from '../util/currency_api_util';

export const RECEIVE_PRICE = 'RECEIVE_PRICE';                       // 24HR price data


// THUNK ACTION CREATORS
export const fetchCurrentPrice = (symbol) => {                      // symbol ex. 'BTC'
    return (dispatch) => {
        return CryptoCompare.fetchCurrentPrice(symbol).then(
            (response) => {            
                let resp = dispatch(receiveCurrentPrice(response));
                // debugger

                return resp;
            },
            (error) => {
                return dispatch(receiveErrors(error.responseJSON))  // ? responseJSON
            }
        );
    };
};



// ACTION CREATOR
const receiveCurrentPrice = (data) => {
    debugger
    // data = data.responseJSON;

    return {
        type: RECEIVE_PRICE,
        payload: { 
            price: data.RAW.PRICE, 
            changePct24HR: data.RAW.CHANGEPCT24HOUR, 
            symbol: data.RAW.FROMSYMBOL 
        }
    }
}


// response.responseJSON    //=>        <- ? wrong
// data =>
// {
//      DISPLAY: { FROMSYMBOL: "Ƀ", TOSYMBOL: "$", MARKET: "CUSTOMAGG", PRICE: "$ 10,896.6", LASTUPDATE: "Just now", … }
//      RAW: { MARKET: "CUSTOMAGG", FROMSYMBOL: "BTC", TOSYMBOL: "USD", FLAGS: 0, PRICE: 10896.55, … }
// }

// response.responseJSON.RAW.PRICE               //=> 10875.75
// response.responseJSON.RAW.CHANGEPCT24HOUR     //=> 4.11






// THUNK ACTION CREATORS
// export const fetchCurrencies = () => {                          // symbol ex. 'BTC'
//     return (dispatch) => {
//         return CurrencyAPIUtil.fetchCurrencies().then(
//             (response) => {
//                 return dispatch(receiveCurrencies(response));
//             }
//         );
//     };
// };

// export const fetchCurrency = (symbol) => {                      // symbol ex. 'BTC'
//     return (dispatch) => {
//         return CurrencyAPIUtil.fetchCurrency(symbol).then(
//             (response) => {
//                 return dispatch(receiveCurrency(response.entities.currentPrice));
//             }
//         );
//     };
// };


// // ACTION CREATOR
// const receiveCurrencies = (data) => {
//     return {
//         type: RECEIVE_PRICE,
//         payload: {}
//     }
// }

// const receiveCurrency = (data) => {
//     return {
//         type: RECEIVE_PRICE,
//         payload: {data}
//     }
// }