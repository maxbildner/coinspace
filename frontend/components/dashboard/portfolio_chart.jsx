import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { 
  fetch1MonthPrices
} from '../../util/prices_util';
import {
  calculatePortfolioValues
} from './portfolio_chart_util';


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
    // const { portfolio, cashBalance, transactions } = this.props;      
    // // portfolioSymbols == [ 'BTC', 'ETH' ]

    // // 1- Loop through each string symbol,                            // each iteration will be an asych call
    // // Fetch 1M data for each time period (daily intervals)- store in array 
    // // currencyArray == [ {time:1569801600, close:8000 }, {}, ... ]   // for 1 currency!
    // let priceData = {};
    // // priceData == { 'BTC': [ {time:1569801600, close:8000 }, {}, ... ], 'ETH': [ {time:1569801600, close:160 }, {}, ... ] }

    // for (let i = 0; i < portfolioSymbols.length; i++) {
    //   let symbol = portfolioSymbols[i];

    //   fetch1MonthPrices(symbol).then(
    //     (response) => {                           // response == currencyArray
    //       priceData[symbol] = response.Data       // populate priceData object (outside of asynch func/loop) with currencyArray
    //     }
    //   );
    // }
    // // 2- Store all data in object, with keys of symbols, values of arrays
    // // populate key/val pair to priceData object
    // // priceData == { 'BTC': [ {time:1569801600, close:8000 }, {}, ... ], 'ETH': [ {time:1569801600, close:160 }, {}, ... ] }

    // // Don't set state below until all priceData object is fully populated with data
    // let flag = true;
    // while (flag) {
    //   if (Object.keys(priceData).length == portfolioSymbols.length) {
    //     flag = false;
    //     this.setState({
    //       "1M": calculatePortfolioValues(priceData, portfolio, cashBalance, transactions),
    //       timePeriodActive: "month"
    //     });
    //   } 
    // }
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