import * as CryptoCompare from '../util/prices_util';
import * as CurrencyAPIUtil from '../util/currency_api_util';

export const RECEIVE_PRICE = 'RECEIVE_PRICE';                       // 24HR price data
export const RECEIVE_24HR_PRICES = 'RECEIVE_24HR_PRICES';
export const RECEIVE_CURRENCY_ERRORS = 'RECEIVE_CURRENCY_ERRORS';

// THUNK ACTION CREATORS
export const fetchCurrentPrice = (symbol) => {                      // symbol ex. 'BTC'
    return (dispatch) => {
        // return CryptoCompare.fetchCurrentPrice(symbol).then(
        return CryptoCompare.fetchCurrentPriceWithExtraInfo(symbol).then(
            (response) => {       

                // debugger
                let resp = dispatch(receiveCurrentPrice(response));

                return resp;
            },
            (error) => {
                // debugger
                return dispatch(receiveErrors(error.responseJSON))  // ? responseJSON
            }
        );
    };
};


// ACTION CREATOR
const receiveCurrentPrice = (data) => {
    // debugger
    // data = data.responseJSON;

    // return {        // WRONG BELOW
    //     type: RECEIVE_PRICE,
    //     payload: {
    //         price: data.RAW.PRICE,
    //         changePct24HR: data.RAW.CHANGEPCT24HOUR
    //     }
    // }

    // debugger
    return {        // CORECT BELOW
        type: RECEIVE_PRICE,
        payload: { 
            price: data.RAW.PRICE,                       // OLD API ENDPOINT (gets a bunch of data)
            // price: data.USD,                          // NEW (current price only)
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









// THUNK ACTIONS
export const fetchHourly1DayPrices = (symbol) => {
    return (dispatch) => {
        return CryptoCompare.fetchHourly1DayPrices(symbol).then(
            (response) => { 
                return dispatch(receiveHourly1DayPrices(response))
            }
        )
    }
}

// ACTION CREATOR
const receiveHourly1DayPrices = (payload) => {

    return ({
        type: RECEIVE_24HR_PRICES,
        data: payload
    })
}

const receiveErrors = (errors) => {     // takes in array
    return ({
        type: RECEIVE_CURRENCY_ERRORS,
        errors
    });
};


















// THUNK ACTION CREATORS TO INTERACT WITHH OWN SERVER (NOT OUTSIDE API)
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