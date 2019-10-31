export const calculatePortfolioValues = (priceData, portfolio, cashBalance, transactions) => {
  debugger
  // priceData    == { 'BTC': [ {time:1569888000, close: 8326.24,...}, {}, ... ] }
  // portfolio    == { 'BTC': 1 }
  // cashBalance  == 1871.57
  // transactions == [ { quantity, price, transaction_type, created_at, currency_symbol } ]

  // REUSABLE FUNCTION
  // -- Different loop
  // 3- Loop through each price in any of the price arrays (all should be same length)
  
  // Determine portfolio @time = t use helper function 1
  // Determine portfolio value @ time = t use helper function 2

  // 4- HELPER FUNCTION 1) takes in TransactionHistory, and time        //=> returns object with keys of currencies, values of quantities @time = t
  // (time, transactionHistory)                                         //=> { 'BTC':1, 'USD':1000 }

  // 5- HELPER FUNCTION 2) Takes in price data at point in time, and quantities, and returns portfolio value at that point in time
  // (time, price object, quantity object)                              // object with two key/val pairs
  // (1569801600, {'BTC':8000, 'USD':1}, {'BTC':1, 'USD': 1000})        //=> { time:1569801600, portfolioValue: 9000 }

  // Still inside loop, push each portfolio value object to outside array
  //=> array of objects that is parseable by Recharts Library
  //=> [ { time:1569801600, portfolioValue: 9000 }, { time:1569888000, portfolioValue: 9200 }, ... ]

  // 6- Using output of Reusable function above, setState at corresponding time interval to output of this function

  // ??? BELOW NOT NEEDED?
  // Pass priceData obj, transactionHistory into function that returns an array of floats (portfolio values over that time period)
  // priceData          == { 'BTC': [ {time:1569801600, close:8000 }, {}, ... ], 'ETH': [ {time:1569801600, close:160 }, {}, ... ] }
  // transactionHistory == [ { time:1569801600 price: 8000, symbol: 'BTC', ... }, {}, ... ]
  // (object, array of objects)                                         //=> 
  // Loop through each price datapoint (array for each currency should all be same length)
  // Determine quantity held of each currency for that point in time (use transaction history)- use helper function 1
  // Determine portfolio value at that point in time (helper function 2)
  // Push portfolio value object to array
}