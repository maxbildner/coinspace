import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';


class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
    // props == { portfolio, cashBalance, currentPrices, transactions }
    // cashBalance    == 1871.57
    // portfolio      == { 'BTC': 1 }
    // transactions   == { quantity: 1, price: 8143.05, transaction_type: "BUY", created_at: "2019-10-22T21:13:03.849Z", currency_symbol: 'BTC' }
    
    // currentPrices object contains 7 keys (currency symbols) ? currentPrices data doesn't hit constructor on 2nd render of this component why? (does hit render method below 2nd time)
    // currentPrices  == {  
    //                    'BTC': { 'USD': { 'PRICE': 9000 } }, 
    //                    'ETH': { 'USD': { 'PRICE': 160 } }, 
    //                    ... 
    //                    }
    // debugger

    this.state = {
      // assetAllocation: calculatePortfolioAllocation(portfolio, portfolio, ),      // array of objects with keys (symbols) and values (floats) that represent % portfolio allocation
      "1D": [],                 // array of portfolio values (floats) for that time period
      "1W": [],
      "1M": [],
      "1Y": [],
      timePeriodActive: '',     // will contain string representing which time period chart to render/bold for css
    }

    this.get1MonthPrices = this.get1MonthPrices.bind(this);
  }

  componentDidMount() {
    // grab keys only from portfolio object
    const portfolioSymbols = Object.keys(this.props.portfolio);
    // portfolioSymbols == [ 'BTC', 'ETH ]

    // On initial page load, get all 1M data for each currency in portfolio
    if (this.state.timePeriodActive != "month") {
      this.get1MonthPrices(portfolioSymbols);                         // ASYNCHRONOUS!
    }
  }

  get1MonthPrices(portfolioSymbols) {                                 // ASYNCHRONOUS!
    // portfolioSymbols == [ 'BTC', 'ETH' ]

    // 1- Loop through each string symbol,                               // each iteration will be an asych call
    // Fetch 1M data for each time period (daily intervals)- store in array 
    // currencyArray == [ {time:1569801600, close:8000 }, {}, ... ]   // for 1 currency!

    // 2- Store all data in object, with keys of symbols, values of arrays
    // push key/val pair to priceData object
    // priceData == { 'BTC': [ {time:1569801600, close:8000 }, {}, ... ], 'ETH': [ {time:1569801600, close:160 }, {}, ... ] }

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



  render() {
    // debugger

    return (
      <div>
        PORTFOLIO CHART
      </div>
    );
  }
}


export default PortfolioChart;