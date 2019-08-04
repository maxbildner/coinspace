import * as CryptoCompare from '../util/prices_util';

export const RECEIVE_PRICE = 'RECEIVE_PRICE';                       // 24HR price data


// THUNK ACTION CREATORS
export const fetchCurrentPrice = (symbol) => {                    // symbol ex. 'BTC'
    return (dispatch) => {
        return CryptoCompare.fetchCurrentPrice(symbol).then(
            (response) => {                        
                return dispatch(receiveCurrentPrice(response));
            },
            (error) => {
                return dispatch(receiveErrors(error.responseJSON))              // ? responseJSON
            }
        );
    };
};



// ACTION CREATOR
const receiveCurrentPrice = (data) => {
    data = data.responseJSON;

    return {
        type: RECEIVE_PRICE,
        payload: { price: data.RAW.PRICE, changePct24HR: data.RAW.CHANGEPCT24HOUR }
    }
}


// response.responseJSON    //=>
// {
//      DISPLAY: { FROMSYMBOL: "Ƀ", TOSYMBOL: "$", MARKET: "CUSTOMAGG", PRICE: "$ 10,896.6", LASTUPDATE: "Just now", … }
//      RAW: { MARKET: "CUSTOMAGG", FROMSYMBOL: "BTC", TOSYMBOL: "USD", FLAGS: 0, PRICE: 10896.55, … }
// }

// response.responseJSON.RAW.PRICE               //=> 10875.75
// response.responseJSON.RAW.CHANGEPCT24HOUR     //=> 4.11