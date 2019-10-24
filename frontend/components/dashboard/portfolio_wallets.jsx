import React from 'react';
import { fetchCurrentPrices } from '../../util/prices_util';

const SUPPORTED_CURRENCIES = ['BTC', 'ETH', 'XRP', 'BCH', 'LTC', 'EOS', 'XLM'];

class PortfolioWallets extends React.Component {
  constructor(props) {
    super(props);
    // props == { cashBalance, portfolio, currentPrices }
    // currentPrices == {BTC: {USD: 7649.32, MKTCAP...}, ETH: {USD: 162.16, MKTCAP... }, ... }

    // this.state = {
    //   currentPrices: null,
    // }

    this.sortPortfolio = this.sortPortfolio.bind(this);
    this.renderSortedRows = this.renderSortedRows.bind(this);
    this.calculateAssetAllocation = this.calculateAssetAllocation.bind(this);
  }


  // componentDidMount() {
  //   if (this.state.currentPrices == null) {
  //     this.getCurrentPrices();
  //   }
  // }

  // getCurrentPrices() {
  //   fetchCurrentPrices(SUPPORTED_CURRENCIES).then(
  //     (response) => {
  //       debugger
  //       // response == {BTC: {USD: 7649.32}, ETH: {USD: 162.16}, ... }
  //       // return this.setState({
  //       // });
  //     }
  //   );
  // }


  calculateAssetAllocation(sortedPortfolio) {     // returns new portfolio array of objects by adding %Allocation for each currency
    // sortedPortfolio = [ { symbol: 'ETH', quantity: 30 }, { symbol: 'BTC', quantity: 1 }, { symbol: 'LTC', quantity: 0.5 } ]
    
    sortedPortfolio
    // calculate value of each currency in USD 
    // calculate total value in USD of entire portfolio (including cash balance)

    

    return portfolio.map( (currencyObj) => {

    });
  }


  sortPortfolio() {           // returns array of objects sorted by asset allocation % high to low
    const portfolio = this.props.portfolio;
    // portfolio = { BTC: 1, LTC: .5, ETH: 30 }
  
    let sortedPortfolio = [];
    // sortedPortfolio = [ { symbol: 'ETH', quantity: 30 }, { symbol: 'BTC', quantity: 1 }, { symbol: 'LTC', quantity: 0.5 } ]

    // convert portfolio object to array of objects
    for (let symbol in portfolio) {
      sortedPortfolio.push({ symbol: symbol, quantity: portfolio[symbol] });
    }

    // sort descending
    return sortedPortfolio.sort((a, b) => b.quantity - a.quantity);
  }


  renderSortedRows() {  // sort by asset allocation % high to low, default to coin mkt cap
    let sortedPortfolio = this.sortPortfolio();
    // sortedPortfolio = [ { symbol: 'ETH', quantity: 30 }, { symbol: 'BTC', quantity: 1 }, { symbol: 'LTC', quantity: 0.5 } ]
    let portfolioAssetAllocation = this.calculateAssetAllocation(sortedPortfolio);


    return sortedPortfolio.map( currencyObj => {
      <tr>
        <td>{currencyObj.symbol}</td>
        <td>test</td>
        <td>test</td>
        <td>test</td>
      </tr>
    });
  }


  render() {
    // debugger

    return (
      <table>
        <thead>
          <tr>
            <th>Portfolio Wallets</th>
          </tr>
        </thead>
        <tbody>
          {this.renderSortedRows()}
          {/* <tr>
            <td>BTC</td>
            <td>Allocation %</td>
            <td>Quantity</td>
            <td>Current Value $</td>
          </tr>
          <tr>
            <td>ETH</td>
            <td>Allocation %</td>
            <td>Quantity</td>
            <td>Current Value $</td>
          </tr>
          <tr>
            <td>XRP</td>
            <td>Allocation %</td>
            <td>Quantity</td>
            <td>Current Value $</td>
          </tr> */}
        </tbody>
      </table>
    );
  }
}

export default PortfolioWallets;