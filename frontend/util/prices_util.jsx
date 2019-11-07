export const fetchCurrentPrices = (...symbols) => {        // takes in comma separated strings of Crypto symbols ex. 'BTC', 'XRP'
    return $.ajax({
        method: "GET",
        url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbols}&tsyms=USD&api_key={23654bbaa50192c8cbeb3ef309179f9283d3c445bd6053c80c374e6fc25876d8}`              // API key DELETED for push to heroku
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
//         url: `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key={23654bbaa50192c8cbeb3ef309179f9283d3c445bd6053c80c374e6fc25876d8}`
//     });       
// }
// price = fetchCurrentPrice('BTC');
// price.responseJSON.USD;     
//=> 10875.75



// DELETED API KEY FOR UPLOADING TO HEROKU
export const fetchCurrentPrice = (symbol) => {
    return $.ajax({
        method: "GET",
        // url: `https://min-api.cryptocompare.com/data/generateAvg?fsym=${symbol}&tsym=USD&e=Coinbase,Bitfinex&api_key={23654bbaa50192c8cbeb3ef309179f9283d3c445bd6053c80c374e6fc25876d8}`        // API key DELETED for push to heroku
        // url: `https://min-api.cryptocompare.com/data/generateAvg?fsym=${symbol}&tsym=USD&e=Coinbase&api_key={23654bbaa50192c8cbeb3ef309179f9283d3c445bd6053c80c374e6fc25876d8}`        // API key DELETED for push to heroku
        url: `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`
    }); 
}


export const fetchCurrentPriceWithExtraInfo = (symbol) => {
    return $.ajax({
        method: "GET",
        url: `https://min-api.cryptocompare.com/data/generateAvg?fsym=${symbol}&tsym=USD&e=Coinbase,Bitfinex&api_key={23654bbaa50192c8cbeb3ef309179f9283d3c445bd6053c80c374e6fc25876d8}`        // API key DELETED for push to heroku
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




//******************************************************************************
// GET HOURLY PRICES FOR LAST 24HOURS (for HOMEPAGE MINI CHART table ONLY)
// price calculated as volume weighted average price of over 70 exchanges
export const fetchHourly1DayPrices = (symbol) => {  // 1 day, hourly prices (24 hours)
    return $.ajax({
        method: 'GET',
        url: `https://min-api.cryptocompare.com/data/histohour?fsym=${symbol}&tsym=USD&limit=24&api_key={23654bbaa50192c8cbeb3ef309179f9283d3c445bd6053c80c374e6fc25876d8}`
    })
}
// resp = fetchHourly1DayPrices('BTC') 
// resp.responseJSON.Data  //=>
// [  {close: 11187}, {}, ... ] 



//******************************************************************************
// FOR DASHBOARD/PORTFOLIO CHART PAGE
export const fetchHistoricalPrices = (symbol, timeframe, interval) => {        // 1 day, minute prices (1440 minutes)
    return $.ajax({
        method: 'GET',
        url: `https://min-api.cryptocompare.com/data/histo${interval}?fsym=${symbol}&tsym=USD&limit=${timeframe}&api_key={23654bbaa50192c8cbeb3ef309179f9283d3c445bd6053c80c374e6fc25876d8}`
    })
}



//******************************************************************************
// CURRENCY SHOW/DETAIL PAGE
export const fetch1DayPrices = (symbol) => {        // 1 day, minute prices (1440 minutes)
    return $.ajax({
        method: 'GET',
        url: `https://min-api.cryptocompare.com/data/histominute?fsym=${symbol}&tsym=USD&limit=1440&api_key={23654bbaa50192c8cbeb3ef309179f9283d3c445bd6053c80c374e6fc25876d8}`
    })      
}

export const fetch1WeekPrices = (symbol) => {       // 7 days, hourly prices (168 hours)
    return $.ajax({
        method: 'GET',
        url: `https://min-api.cryptocompare.com/data/histohour?fsym=${symbol}&tsym=USD&limit=168&api_key={23654bbaa50192c8cbeb3ef309179f9283d3c445bd6053c80c374e6fc25876d8}`
    })       
}

export const fetch1MonthPrices = (symbol) => {      // 30 days, daily "closing" prices
    return $.ajax({
        method: 'GET',
        url: `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=30&api_key={23654bbaa50192c8cbeb3ef309179f9283d3c445bd6053c80c374e6fc25876d8}`
    })
}

export const fetch1YearPrices = (symbol) => {       // 360 days, daily prices
    return $.ajax({
        method: 'GET',
        url: `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=360&api_key={23654bbaa50192c8cbeb3ef309179f9283d3c445bd6053c80c374e6fc25876d8}`
    })       
}

export const fetchCurrencyNews = (symbol) => {
    return $.ajax({
        method: 'GET',
        url: `https://min-api.cryptocompare.com/data/v2/news/?categories=${symbol}&api_key={23654bbaa50192c8cbeb3ef309179f9283d3c445bd6053c80c374e6fc25876d8}`
    });
};
// promise = fetchCurrencyNews('BTC');
// promise.responseJSON.Data       
//=> [ {
//      id: '1', 
//      guid: 'wsjournal.com', 
//      published_on: 1565287425, 
//      imageurl: '', 
//      title: '',
//      source: 'wsjournal',
//      body: 'blah blah blah...'
//     }, 
//     {} ]



//******************************************************************************
//* CURRENCY SHOW DETAIL/SEARCH PAGE
// GET 24HR VOL, SUPPLY, MKTCAP,... FOR MULTIPLE CURRENCIES
export const fetchCurrencyInfo = (...symbols) => {   // 360 days, daily prices
    return $.ajax({
        method: 'GET',
        url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbols}&tsyms=USD&api_key={23654bbaa50192c8cbeb3ef309179f9283d3c445bd6053c80c374e6fc25876d8}`
    })
}


// GET 24HR VOL, SUPPLY, MKTCAP FOR 1 CURENCY
// export const fetchCurrencyInfo = (symbol) => {       // 360 days, daily prices
//     return $.ajax({
//         method: 'GET',
//         url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key={23654bbaa50192c8cbeb3ef309179f9283d3c445bd6053c80c374e6fc25876d8}`
//     })       
// }
// promise = fetchVol24HRS('BTC');
// promise.responseJSON.DISPLAY.BTC.USD.TOTALVOLUME24HTO    //=> "$4.52B"
// promise.responseJSON.DISPLAY.BTC.USD.MKTCAP              //=> "$ 209.88 B"
// promise.responseJSON.DISPLAY.BTC.USD.SUPPLY              //=> "Ƀ 17,864,975.0"



//******************************************************************************
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