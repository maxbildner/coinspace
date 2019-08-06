export const fetchCurrentPrices = (...symbols) => {        // takes in comma separated strings of Crypto symbols ex. 'BTC', 'XRP'
    return $.ajax({
        method: "GET",
        url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbols}&tsyms=USD&api_key={}`              // API key DELETED for push to heroku
    });
}
// prices = fetchPrices('BTC', 'ETH', 'XRP');
// prices.responseJSON //=> 
// { 
//     BTC: { USD: 10861.65 }
//     ETH: { USD: 222.59 }
//     XRP: { USD: 0.3163 }
// }


// ONLY RETURNS PRICE
// takes in one string of crypto symbol, ex. 'BTC'
// export const fetchCurrentPrice = (symbol) => {        
//     return $.ajax({
//         method: "GET",
//         url: `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key={}`
//     });       
// }
// price = fetchCurrentPrice('BTC');
// price.responseJSON.USD;     
//=> 10875.75



// DELETED API KEY FOR UPLOADING TO HEROKU
export const fetchCurrentPrice = (symbol) => {
    return $.ajax({
        method: "GET",
        url: `https://min-api.cryptocompare.com/data/generateAvg?fsym=${symbol}&tsym=USD&e=Coinbase,Bitfinex&api_key={}`        // API key DELETED for push to heroku
    }); 
}
// response = fetchCurrentPrice('BTC');
// response.responseJSON    //=>
// {
//      DISPLAY: { FROMSYMBOL: "Ƀ", TOSYMBOL: "$", MARKET: "CUSTOMAGG", PRICE: "$ 10,896.6", LASTUPDATE: "Just now", … }
//      RAW: { MARKET: "CUSTOMAGG", FROMSYMBOL: "BTC", TOSYMBOL: "USD", FLAGS: 0, PRICE: 10896.55, … }
// }

// response.responseJSON.RAW.PRICE               //=> 10875.75
// response.responseJSON.RAW.CHANGEPCT24HOUR     //=> 4.11





// GET HOURLY PRICES FOR LAST 24HOURS (for homepage chart table):
// price calculated as volume weighted average price of over 70 exchanges
export const fetchHourly1DayPrices = (symbol) => {
    return $.ajax({
        method: 'GET',
        url: `https://min-api.cryptocompare.com/data/histohour?fsym=${symbol}&tsym=USD&limit=24&api_key={}`
    })
}
// resp = fetchHourly1DayPrices('BTC') 
// resp.responseJSON.Data  //=>
// [  {close: 11187}, {}, ... ] 







// CRYPTOCOMPARE
// https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key=INSERT-YOUR-API-KEY-HERE

// export const fetchCoins = () => (
//     $.ajax({
//         url: 'api/coins',
//         method: 'GET',
//     })
// );

// export const fetch1WPrices = (symbol) => (
//     // Note: this request returns data points in reverse (ie., most recent price last)
//     // This needs to be adjusted before rendering
//     $.ajax({
//         url: 'https://min-api.cryptocompare.com/data/histominute',
//         data: {
//             fsym: symbol,
//             tysm: 'USD',
//             aggregate: 30,
//             limit: 360,
//         },
//     })
// );





// ROBINHOOD
// export const fetchPrices = (ticker, timeframe) => {
//     return $.ajax({
//         method: "GET",
//         url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/${timeframe}?chartIEXOnly=true&token=${window.iexAPIKey}`
//     })
// }