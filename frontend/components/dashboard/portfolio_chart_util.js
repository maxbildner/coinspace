export const calculatePortfolioValues = (pricesData, portfolio, cashBalance, transactions) => {
  // REUSABLE FUNCTION, priceData will always be populated!!! NOT EMPTY
  debugger
  // pricesData   == { 'BTC': [ {time:1569888000, close: 8326.24,...}, ... ], 'LTC':[], ... ] }
  // portfolio    == { 'BTC': 1 }
  // cashBalance  == 1871.57
  // transactions == [ { quantity, price, transaction_type, created_at, currency_symbol } ]

  // All currency keys in priceData
  let currencySymbols = Object.keys(pricesData);
  // currencySymbols = [ 'BTC', 'LTC' ]

  // Grab first currency array in priceData object
  let firstCurrencySymbol = currencySymbols[0];
  // firstCurrencySymbol == 'BTC'

  // Grab array at key of firstCurrencySymbol
  let firstCurrency = pricesData[firstCurrencySymbol];
  // firstCurrency == [ {time:1569888000, close: 8326.24,...}, {}, ... ]

  let numDataPoints = firstCurrency.length;
  // numDataPoints == 31    (monthly data)

  // TO RETURN
  let portfolioValues = [];                                                     
  // => [ { time:1569801600, portfolioValue: 9000 }, { time:1569888000, portfolioValue: 9200 }, ... ]


  // Loop through each price in any of the price arrays (all should be same length)
  // Calculate Portfolio Value at time t in this loop, and push to outside array (return this array later)
  for (let t = 0; t < numDataPoints; t++) {
    
    let time = firstCurrency[t][time];
    // firstCurrency == [ {time:1569888000, close: 8326.24,...}, {}, ... ]
    // time == 1569888000

    // 1) GET ALL PRICES FOR EACH CURRENCY IN PORTFOLIO AT A PARTICULAR POINT IN TIME
    // Helper function 1
    let pricesAtTimeT = getPricesAtTimeT(t, pricesData);
    // t = 0, pricesData = { 'BTC': [ {time:1569888000, close: 8326.24,...}, ... ], 'LTC':[], ... ] }
    // pricesAtTimeT == { BTC:8326.24, LTC:164 }
  
    // 2) Determine portfolio price/quantites quantities @time = t use helper function 2
    // Helper function 2 takes in prices, transactionHistory, and time     //=> returns object with keys of currencies, values of quantities&prices @time = t
    // (pricesAtTimeT, transactionHistory, time                            //=> { 'BTC':{price:8000, quantity:1}, 'USD':{price:1, quantity:1000} }
    let portfolioAtTimeT = getPortfolioAtTimeT(pricesAtTimeT, transactions, time);
    // portfolioAtTimeT == { 'BTC':{price:8000, quantity:1}, 'USD':{price:1, quantity:1000} }

    // 3) Determine portfolio value @ time = t use helper function 3
    // Helper function 3 Takes in prices data at point in time, and quantities, and returns portfolio value at that point in time
    // (time, price/quantity object)                                      // object of quantities/prices at a time t
    // (1569801600, { 'BTC': { price:8000, quantity: 1 }, 'USD': { price:1, quantity: 1000 } })        
    //                                                                    //=> { time:1569801600, portfolioValue: 9000 }
    let portfolioValue = calculatePortfolioValueAtTimeT(time, portfolioAtTimeT);
    // portfolioValue == { time:1569801600, portfolioValue: 9000 }

    // push each portfolio value object to outside array (parseable by Recharts Library)
    portfolioValues.push(portfolioValue);
  }

  return portfolioValues;
  // portfolioValues == [ { time:1569801600, portfolioValue: 9000 }, { time:1569888000, portfolioValue: 9200 }, ... ]
  // Using return val of this function, setState at corresponding time interval outside this function
}






// HELPER FUNCTIONS
// 1) GET ALL PRICES FOR EACH CURRENCY IN PORTFOLIO AT A PARTICULAR POINT IN TIME
// takes in integer representing time point in time of time time period, and object of all prices over time for each currency
// returns object of all prices at time t
// => { BTC:8326.24, LTC:164 }
function getPricesAtTimeT(t, pricesData) {  
  // t == 0                              
  // pricesData   == { 'BTC': [ {time:1569888000, close: 8326.24,...}, ... ], 'LTC':[], ... ] }

  // TO RETURN
  let pricesObject = {};   
  
  // All currency keys in priceData
  let currencySymbols = Object.keys(pricesData);
  // currencySymbols = [ 'BTC', 'LTC' ]

  // Loop through each currency in currencySymbols array and grab closing price at time t
  for (let i = 0; i < currencySymbols.length; i++) {
    let symbol = currencySymbols[i];
    // i = 0: symbol == 'BTC'

    // All price data for a single currency
    let priceDataArray = pricesData[symbol];                                   
    // i = 0: priceDataArray == [ {time:1569888000, close: 8326.24,...}, ... ]

    let priceAtTimeT = priceDataArray[t].close;
    // i = 0: priceAtTimeT == 8326.24

    pricesObject[symbol] = priceAtTimeT;
    // priceObject == { 'BTC':8326.24 }
  }

  return pricesObject;
}





// 2) Determine portfolio price/quantites quantities @time = t use helper function 2
// Helper function 2 takes in prices, transactionHistory, and time     //=> returns object with keys of currencies, values of quantities&prices @time = t
// (pricesAtTimeT, transactionHistory, time)                           //=> { 'BTC':{price:8000, quantity:1}, 'USD':{price:1, quantity:1000} }
// returns => { 'BTC':{price:8000, quantity:1}, 'USD':{price:1, quantity:1000} }
function getPortfolioAtTimeT(pricesAtTimeT, transactions, time) {
  // pricesAtTimeT == { BTC:8326.24, LTC:164 }
  // transactions == [ { quantity, price, transaction_type, created_at, currency_symbol }, {}, ... ]
  // time == 1569888000
  // NOTE* TIME is in SECONDS from Jan 1, 1970, but new Date expects time stamp in MILISECONDS from Jan 1, 1970
  // so multiply by 1000:  https://stackoverflow.com/questions/49978130/format-crypto-api-date-to-datestring
  // ? UNIX Timestamp?
  let gmtTime = new Date(time * 1000);
  // gmtTime = Mon Sep 30 2019 20:00:00 GMT-0400 (Eastern Daylight Time)    <- DATE OBJECT NOT STRING
  let dayOfMonth = gmtTime.getDate();
  // dayOfMonth = 30
  let month = gmtTime.getMonth();
  // 8 == september because nums start at 0

  // TO RETURN
  let portfolio = {};

  // If input time comes before the first transaction in the input array, return empty object
  let firstTransaction = new Date(transactions[0].created_at);
  let firstTransactionDayOfMonth = firstTransaction.getDate();
  // firstTransactionDayOfMonth = 22
  let firstTransactionMonth = firstTransaction.getMonth();
  // firstTransactionMonth = 9      (october)
  if (month < firstTransactionMonth) {
    return {};
  } else if (month === firstTransactionMonth && dayOfMonth < firstTransactionDayOfMonth) {
    return {};
  }

  // Starting from begining of all transactions, loop from start to end
  for (let i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    let transactionTime = new Date(transaction.created_at);
    let transactionDayOfMonth = transactionTime.getDate();
    // i = 0: transactionDayOfMonth = 22
    let transactionMonth = transactionTime.getMonth();
    // i = 0: transactionMonth = 9    (october)

    // if user bought currency on this date, add currency to portfolio
    if (transaction.transaction_type === 'BUY') {
      portfolio[transaction.currency_symbol] = transaction.quantity; 
    } else {
      // Keep adding/removing currencies from portfolio at each point in time until we reach input time
      delete portfolio[transaction.currency_symbol];
    }

    if ((dayOfMonth === transactionDayOfMonth) && (month === transactionMonth)) {
      break;
    }
  }

  return portfolio;
}




function calculatePortfolioValueAtTimeT() {

}