// returns => 11095.47
export const currentPortfolioValue = (portfolio, currentPrices, cashBalance) => {
  // cashBalance    == 1871
  // portfolio      == { 'BTC': 1, 'LTC' }
  // currentPrices object contains 7 keys (currency symbols) ? currentPrices data doesn't hit constructor on 2nd render of this component why? (does hit render method below 2nd time)
  // currentPrices  == {  
  //                    'BTC': { 'USD': { 'PRICE': 9000 } }, 
  //                    'ETH': { 'USD': { 'PRICE': 160 } }, 
  //                    ... 
  //                    }

  let portfolioValue = cashBalance;

  // On first render, currentPrices will be empty {}, so return null;
  if (Object.keys(currentPrices).length === 0) return null;

  // loop through each currency in portfolio
  for (let symbol in portfolio) {
    let quantity = portfolio[symbol];
    let price = currentPrices[symbol].USD.PRICE;

    // get value = quantity * price
    let value = quantity * price;

    // keep running total of value
    portfolioValue += value;
  }

  // debugger
  return portfolioValue.toFixed(2);
}



// returns => [ { time:1569801600, portfolioValue: 9000 }, { time:1569888000, portfolioValue: 9200 }, ... ]
export const calculatePortfolioValues = (pricesData, transactions) => {
  // REUSABLE FUNCTION, priceData will always be populated!!! NOT EMPTY
  // debugger
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

  if (firstCurrency == undefined) return [];

  let numDataPoints = firstCurrency.length;
  // numDataPoints == 31    (monthly data)

  // TO RETURN
  let portfolioValues = [];                                                     
  // => [ { time:1569801600, portfolioValue: 9000 }, { time:1569888000, portfolioValue: 9200 }, ... ]
  // debugger

  // Loop through each price in any of the price arrays (all should be same length)
  // Calculate Portfolio Value at time t in this loop, and push to outside array (return this array later)
  for (let t = 0; t < numDataPoints; t++) {
    
    // debugger
    let time = firstCurrency[t].time;
    // firstCurrency == [ {time:1569888000, close: 8326.24,...}, {}, ... ]
    // time == 1569888000
    // debugger

    // 1) GET ALL PRICES FOR EACH CURRENCY IN PORTFOLIO AT A PARTICULAR POINT IN TIME
    // Helper function 1
    let pricesAtTimeT = getPricesAtTimeT(t, pricesData);
    // t = 0, pricesData = { 'BTC': [ {time:1569888000, close: 8326.24,...}, ... ], 'LTC':[], ... ] }
    // pricesAtTimeT == { BTC:8326.24, LTC:164 }
    // debugger
  
    // 2) Determine portfolio price/quantites quantities @time = t use helper function 2
    // Helper function 2 takes in prices, transactionHistory, and time          //=> returns object with keys of currencies, values of quantities&prices @time = t
    // (pricesAtTimeT, transactionHistory, time                                 //=> { 'BTC':{price:8000, quantity:1}, 'USD':{price:1, quantity:1000} }
    let portfolioAtTimeT = getPortfolioAtTimeT(pricesAtTimeT, transactions, time);
    // portfolioAtTimeT == { 'BTC':{price:8000, quantity:1}, 'USD':{price:1, quantity:1000} }
    // debugger

    // 3) Determine portfolio value @ time = t use helper function 3
    // Helper function 3 Takes in prices data at point in time, and quantities, and returns portfolio value at that point in time
    // (time, price/quantity object)                                            // object of quantities/prices at a time t
    // (1569801600, { 'BTC': { price:8000, quantity: 1 }, 'USD': { price:1, quantity: 1000 } })        
    //                                                                          //=> { time:1569801600, portfolioValue: 9000 }
    let portfolioValue = calculatePortfolioValueAtTimeT(time, portfolioAtTimeT);
    // portfolioValue == { time:1569801600, portfolioValue: 9000 }
    // debugger

    // push each portfolio value object to outside array (parseable by Recharts Library)
    portfolioValues.push(portfolioValue);
  }
  
  // debugger

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
// Helper function 2 takes in prices, transactionHistory, and time              //=> returns object with keys of currencies, values of quantities&prices @time = t
// (pricesAtTimeT, transactionHistory, time)                                    //=> { 'BTC':{price:8000, quantity:1}, 'USD':{price:1, quantity:1000} }
// returns => { 'BTC':{price:8000, quantity:1}, 'USD':{price:1, quantity:1000} }
// Portfolio value is calculated at the end of the Day (last transaction of the day)
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
  let year = gmtTime.getFullYear();

  // TO RETURN
  let portfolio = { 'USD': { price:1, quantity:10000} };                        // all portfolio's start off with 10k
  // => { 'BTC':{price:8000, quantity:1}, 'USD':{price:1, quantity:1000} }

  let firstTransaction = new Date(transactions[0].created_at);
  let firstTransactionDayOfMonth = firstTransaction.getDate();
  // firstTransactionDayOfMonth = 22
  let firstTransactionMonth = firstTransaction.getMonth();
  // firstTransactionMonth = 9      (october)
  let firstTransactionYear = firstTransaction.getFullYear();
  
  // If input time comes before the first transaction in the input array, return empty object
  if (month < firstTransactionMonth) {
    // debugger
    return {};
  } else if (month === firstTransactionMonth && dayOfMonth < firstTransactionDayOfMonth) {
    // debugger
    return {};
  } else if (year < firstTransactionYear) {
    return {};
  }

  // Starting from begining of all transactions, loop from start to end
  // Keep adding/removing currencies to portfolio until we reach input time
  for (let i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    let transactionTime = new Date(transaction.created_at);
    let transactionDayOfMonth = transactionTime.getDate();
    // i = 0: transactionDayOfMonth = 22
    let transactionMonth = transactionTime.getMonth();
    // i = 0: transactionMonth = 9    (october)
    // debugger

    // portfolio => { 'BTC':{price:8000, quantity:1}, 'USD':{price:1, quantity:1000} }
    // If user BUYS currency on this date, add currency to portfolio
    if (transaction.transaction_type === 'BUY') {
      
      // debugger
      // Add price and to portfolio
      portfolio[transaction.currency_symbol] = { price: transaction.price, quantity: transaction.quantity }; 
      // portfolio = {USD: {price:1, quantity: 10000}, BTC: {price: 8143, quantity:1} }
      // debugger

      // Decrease usd cash balance by purchase amount
      let purchaseAmount = transaction.price * transaction.quantity;
      portfolio.USD.quantity = portfolio.USD.quantity - purchaseAmount;
      // portfolio = {USD: {price:1, quantity: 1856.949}, BTC: {price: 8143, quantity:1} }
      // debugger

    } else {  // If user SELLS currency on this date
      // Remove currency quantity from portfolio
      let oldQuantity = portfolio[transaction.currency_symbol].quantity;
      // oldQUantity = 1
      // debugger

      // Reduce portoflio's oldQuantity by new quantity (+ add because quantity when selling is negative)
      portfolio[transaction.currency_symbol] = { price: transaction.price, quantity: oldQuantity + transaction.quantity };
      // debugger

      // Increase cash balance by sale amount
      let saleAmount = transaction.price * transaction.quantity;                // Will be negative bec. quantity is negative
      portfolio.USD.quantity = portfolio.USD.quantity - saleAmount;             // minus because sale amount is negative
      // debugger
    }

    // PORTFOLIO PRICES/VALUES ARE CALCULATED BASED ON CLOSING PRICE OF EXCHANGE NOT PURCHASE PRICE OF CURRENCY!!
    // Update prices in portfolio to current prices
    portfolio = updatePrices(portfolio, pricesAtTimeT);
    // debugger

    // If the transaction time matches the input time + 1 Day, exit loop (only get portfolio up to this point)
    // Portfolio value is calculated at the end of the Day (last transaction of the day)
    // if ((dayOfMonth === transactionDayOfMonth) && (month === transactionMonth)) {
    if ((dayOfMonth > transactionDayOfMonth + 1) && (month === transactionMonth)) {
      // 23 > 22        
      // debugger
      break;
    }
  }
  
  return portfolio;
}


// HELPER HELPER FUNCTION
// Mutates input portfolio
// => {USD: {price:1, quantity:1000},  BTC:{price:7444.2, quantity: 1}, LTC:{price: 160, quantity: 1}}
function updatePrices(portfolio, pricesAtTimeT) {
  // pricesAtTimeT == {BTC:7444.2, LTC:160}
  // portfolio == {USD: {price:1, quantity:1871.56},  BTC:{price:8143, quantity: 1},  LTC:{price:152, quantity: 1}}

  // loop through each symbol key in portfolio object
  for (let symbol in portfolio) {
    // if symbol is NOT USD, update price
    if (symbol !== 'USD') {
      portfolio[symbol].price = pricesAtTimeT[symbol];
    }
  }

  return portfolio;
}







// HELPER FUNCTION
// 3) Determine portfolio value @ time = t use helper function 3
// Helper function 3- Takes in prices data at point in time, and quantities, and returns portfolio value at that point in time
// (time, price/quantity object)                                            // object of quantities/prices at a time t
// (1569801600, { 'BTC': { price:8000, quantity: 1 }, 'USD': { price:1, quantity: 1000 } })        
//                                                                          //=> { time:1569801600, portfolioValue: 9000 }
// returns => { time:1569801600, portfolioValue: 9000 }
function calculatePortfolioValueAtTimeT(time, portfolioAtTimeT) {
  // time == 1569801600
  // portfolioAtTimeT == { 'BTC':{price:8000, quantity:1}, 'USD':{price:1, quantity:1000} }
  let gmtTime = new Date(time * 1000);
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  const month = months[gmtTime.getMonth()];
  const day = gmtTime.getDate();
  let newTime = month + ' ' + day;

  let portfolioValue = { time: newTime };

  let runningTotalValue = 0;
  // debugger

  // loop through each currency in portfolioAtTimeT
  for (let symbol in portfolioAtTimeT) {
    // debugger
    // calculate total value of each currency = price * quantity

    // keep running total of value
    runningTotalValue += portfolioAtTimeT[symbol].price * portfolioAtTimeT[symbol].quantity;
  }

  portfolioValue['portfolioValue'] = Number(runningTotalValue.toFixed(2));

  return portfolioValue;
}

