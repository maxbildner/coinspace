import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';


class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
    // props == { portfolio, cashBalance, currentPrices }
    // cashBalance    == 1871.57
    // portfolio      == { 'BTC': 1 }
    //
    // currentPrices object contains 7 keys (currency symbols) ? currentPrices data doesn't hit constructor on 2nd render of this component why? (does hit render method below 2nd time)
    // currentPrices  == {  
    //                    'BTC': { 'USD': { 'PRICE': 9000 } }, 
    //                    'ETH': { 'USD': { 'PRICE': 160 } }, 
    //                    ... 
    //                    }
    // debugger

    this.state = {
      "1D": [],                 // will contain array of portfolio values (floats) for that time period
      "1W": [],
      "1M": [],
      "1Y": [],
      timePeriodActive: '',     // will contain string representing which time period chart to render/bold for css
    }
  }

  componentDidMount() {
    // On initial page load, get all 1M data for each currency in portfolio
    
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