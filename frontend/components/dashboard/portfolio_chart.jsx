import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { 
  fetch1MonthPrices
} from '../../util/prices_util';
import {
  calculatePortfolioValues,
  currentPortfolioValue
} from './portfolio_chart_util';


class PortfolioChart extends React.Component {
  constructor(props) {          // ONLY CALLED ONCE BEFORE THE FIRST RENDER
    super(props);
    // props == { portfolio, cashBalance, currentPrices, transactions }
    // cashBalance    == 1871.57
    // portfolio      == { 'BTC': 1, 'LTC' }
    // transactions   == { quantity: 1, price: 8143.05, transaction_type: "BUY", created_at: "2019-10-22T21:13:03.849Z", currency_symbol: 'BTC' }
    
    // currentPrices object contains 7 keys (currency symbols) ? currentPrices data doesn't hit constructor on 2nd render of this component why? (does hit render method below 2nd time)
    // currentPrices  == {  
    //                    'BTC': { 'USD': { 'PRICE': 9000 } }, 
    //                    'ETH': { 'USD': { 'PRICE': 160 } }, 
    //                    ... 
    //                    }
    // debugger
    const { portfolio, currentPrices, cashBalance } = props;
    

    this.state = {
      "1D-prices": [],                                                    // array of price data from ajax request
      "1W-prices": [],
      "1M-prices": [],
      "1Y-prices": [],
      "1D-values": [],                                                    // array of portfolio values (floats) for that time period
      "1M-values": [],                
      portfolioSymbols: Object.keys(this.props.portfolio),                // portfolioSymbols == [ 'BTC', 'ETH ]
      timePeriodActive: '',                                               // will contain string representing which time period chart to render/bold for css
      portfolioValue: null,
    }

    this.get1MonthPrices = this.get1MonthPrices.bind(this);
  }

  componentDidMount() {                                                   // ONLY CALLED ONCE AFTER THE FIRST RENDER
    let numSymbols = this.state.portfolioSymbols.length;                  // 2
    // debugger

    // On initial page load, get all 1M data for each currency in portfolio
    if (this.state.timePeriodActive != "month") {
      this.get1MonthPrices(numSymbols);                                   // numSymbols in portfolio
    }
  }

  componentDidUpdate() {                              
    let currentNumSymbols = this.state.portfolioSymbols.length;           // ex. [ 'BTC' ].length
    const { portfolio, cashBalance, transactions } = this.props;
    const priceData = this.state["1M-prices"];

    // debugger
    // If we haven't fetched the data for all currencies in the portfolio
    // n first componentDidUpdate, currentNumSymbols == 1
    if (currentNumSymbols > 0) {
      // debugger
      this.get1MonthPrices();
    }

    // Once all data has been fetched, calculate the portfolio value, and update state again
    if (this.state["1M-values"].length == 0) {
      this.setState({
        "1M-values": calculatePortfolioValues(priceData, portfolio, cashBalance, transactions)
      });
    }
  }

  get1MonthPrices() {   
    
    // let portfolio = ['BTC', 'LTC']
    // //
    // let historicalData = {}
    // // { BTC: [ {time, price}, {}] }

    // Promise.all(portfolio.map( (coin)=> {
    //   //
    // })
    
    // ).then(

    // );


    // ASYNCHRONOUS!
    // const { portfolio, cashBalance, transactions } = this.props;      
    let portfolioSymbols = this.state.portfolioSymbols.slice();           // duplicate array
    // portfolioSymbols == [ 'BTC', 'ETH' ]

    // 1- Loop through each string symbol,                                // each iteration will be an asych call
    // Fetch 1M data for each time period (daily intervals)- store in array 
    // currencyArray == [ {time:1569801600, close:8000 }, {}, ... ]       // for 1 currency!
    let priceData = {};
    // priceData == { 'BTC': [ {time:1569801600, close:8000 }, {}, ... ], 'ETH': [ {time:1569801600, close:160 }, {}, ... ] }
    // NOTE* TIME is in SECONDS from Jan 1, 1970, but new Date expects time stamp in MILISECONDS from Jan 1, 1970
    // so multiply by 1000:  https://stackoverflow.com/questions/49978130/format-crypto-api-date-to-datestring

    // portfolioSymbols will be 2 (on first call of this method)
    if (portfolioSymbols.length > 0) {
      let currSymbol = portfolioSymbols[0];
      // debugger

      fetch1MonthPrices(currSymbol).then(
        (response) => {                                       // response == currencyArray
          priceData[currSymbol] = response.Data               // populate priceData object (outside of asynch func/loop) with currencyArray
          portfolioSymbols.shift();                           // destructively delete first ele in array
          // debugger
          return (this.setState({
            "1M-prices": priceData,                           // { 'BTC': [...] }
            portfolioSymbols: portfolioSymbols,               // after first call == [ 'ETH' ]
            timePeriodActive: "month",
          }));
        }
      );
    }
    
    // debugger
    // 2- Store all data in object, with keys of symbols, values of arrays
    // populate key/val pair to priceData object
    // priceData == { 'BTC': [ {time:1569801600, close:8000 }, {}, ... ], 'ETH': [ {time:1569801600, close:160 }, {}, ... ] }
  }



  render() {
    // debugger
    const { portfolio, currentPrices, cashBalance } = this.props;

    return (
      <div id="portfoliochart-container">
        PORTFOLIO CHART
        <div id="portfoliochart-current-val">
          Your Portfolio Value: {currentPortfolioValue(portfolio, currentPrices, cashBalance)}
        </div>

        	<LineChart width={700} height={245} data={this.state["1M-values"]}>
          {/* <Tooltip content={<CustomTooltip/>} coordinate={{x: -1000, y: 0}}/> */}
          {/* <Tooltip content={<CustomTooltip />} offset={-65} animationDuration={100} /> */}
          <Tooltip/>}
          {/* <Tooltip labelFormatter={() => 'hello'}/>} */}
          {/* <Tooltip formatter={(a, b, c) => { console.log(a, b, c) } } /> */}
          {/* <Tooltip separator="$"/> */}

          <XAxis dataKey="time" />
          {/* <YAxis type="number" domain={['dataMin - 5', 'dataMax + 5']} /> */}
          <YAxis type="number" />
          <Line
            type="monotone"
            dataKey="portfolioValue"
            dot={false}
            activeDot={{ r: 5 }}
          // stroke="#8884d8" 
          // strokeWidth={4}
          />
        </LineChart>
      </div>
    );
  }
}


export default PortfolioChart;