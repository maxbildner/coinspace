export const fetchCurrencies = () => {
    return $.ajax({
        method: 'GET',
        url: 'api/currencies'
    });
}
// promise => {
//     cryptocurrencies: {
//         1: { id: 1, symbol: "BTC", name: "Bitcoin" }
//         2: { id: 2, symbol: "ETH", name: "Ethereum" }
//         3: { id: 3, symbol: "XRP", name: "XRP" }
//         4: { id: 4, symbol: "BCH", name: "Bitcoin" }
//         5: { id: 5, symbol: "LTC", name: "Litecoin" }
//     }
// }


// To test on SHOW the browser / console window:
// fetch currency BY SYMBOL and we want id
export const fetchCurrency = (id) => {
    return $.ajax({
        method: 'GET',
        url: `api/currencies/${id}`
    });
}

// promise.responseJSON =>
// {
//     id: 1,
//         symbol: 'BTC',
//             name: 'BITCOIN'
// }




// FOR CURRENCY SHOW/DETAIL PAGE:
// To test on SHOW the browser / console window:
// fetch currency BY SYMBOL and we want id
export const fetchDescription = (symbol) => {
    return $.ajax({
        method: 'GET',
        url: `api/currencies/${symbol}`,
        data: { symbol }
    });
}
