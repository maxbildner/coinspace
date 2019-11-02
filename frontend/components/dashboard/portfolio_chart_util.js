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
  

  // 2) GET ALL PORTFOLIO QUANTITIES FOR EACH CURRENCY AT A PARTICULAR POINT IN TIME
  // //=> { 'BTC':{price:8000, quantity 1}, 'USD':{price:1, quantity: 1000} }

  // 3) CALCULATE PORTFOLIO VALUE AT A PARTICULAR POINT IN TIME


  // Loop through each price in any of the price arrays (all should be same length)
  // Calculate Portfolio Value at time t in this loop, and push to outside array (return this array later)
  for (let t = 0; t < numDataPoints; t++) {
    let symbol, priceAtTimeT, priceDataArray;

    let time = firstCurrency[t][time];
    // firstCurrency == [ {time:1569888000, close: 8326.24,...}, {}, ... ]
    // time == 1569888000

    // 1) GET ALL PRICES FOR EACH CURRENCY IN PORTFOLIO AT A PARTICULAR POINT IN TIME
    let pricesAtTimeT = getPricesAtTimeT(t, pricesData);
    // t = 0, pricesData = { 'BTC': [ {time:1569888000, close: 8326.24,...}, ... ], 'LTC':[], ... ] }
    // pricesAtTimeT == { BTC:8326.24, LTC:164 }
  
    // Determine portfolio price/quantites quantities @time = t use helper function 1
    // 2) HELPER FUNCTION 1 takes in TransactionHistory, and time         //=> returns object with keys of currencies, values of quantities @time = t
    // (time, prices, transactionHistory)                                 //=> { 'BTC':{price:8000, quantity:1}, 'USD':{price:1, quantity:1000} }
    let portfolioAtTimeT = getPortfolioAtTimeT(pricesAtTimeT, transactions);
    // portfolioAtTimeT == { 'BTC':{price:8000, quantity:1}, 'USD':{price:1, quantity:1000} }

    // Determine portfolio value @ time = t use helper function 2
    // 3) HELPER FUNCTION 2 Takes in prices data at point in time, and quantities, and returns portfolio value at that point in time
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





// 1) GET ALL PRICES FOR EACH CURRENCY IN PORTFOLIO AT A PARTICULAR POINT IN TIME
let pricesAtTimeT = getPricesAtTimeT(t, pricesData);
    // t = 0, pricesData = { 'BTC': [ {time:1569888000, close: 8326.24,...}, ... ], 'LTC':[], ... ] }
    // pricesAtTimeT == { BTC:8326.24, LTC:164 }

// HELPER FUNCTIONS
// 1) GETS ALL PRICES FOR EACH CURRENCY IN PORTFOLIO AT A PARTICULAR POINT IN TIME
// takes in integer representing time point in time of time time period, and object of all prices over time for each currency
// returns array of prices at time t
// => [ {BTC:{time:1569888000, close: 8326.24,...}}, LTC:{time, close,...}, ... ]
function getPricesAtTimeT(t, pricesData) {  
  // t == 0                              
  // pricesData   == { 'BTC': [ {time:1569888000, close: 8326.24,...}, ... ], 'LTC':[], ... ] }


  // Grab price arrays for each currency in priceData
  for (let j = 0; j < currencySymbols.length; j++) {
    symbol = currencySymbols[j];
    // i = 0, j = 0: symbol == 'BTC'

    priceDataArray = pricesData[symbol];                                   // all price data for a single currency
    // i = 0, j = 0: priceDataArray == [ {time:1569888000, close: 8326.24,...}, ... ]

    priceAtTimeT = priceDataArray[i];
    // i = 0, j = 0: priceAtTimeT == { time:1569888000, close: 8326.24,... }

    let priceObject = {};
    priceObject[symbol] = priceDataArray;
    // priceObject == { 'BTC':[{time:1569888000, close: 8326.24,...}, ... ] }

    pricesAtTimeT.push({});
  }
}



function calculateQuantityAtTimeT(time, transactionHistory) {

}



function calculatePortfolioValueAtTimeT() {

}