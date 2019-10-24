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
    // sortedPortfolio = [ { symbol: 'USD', quantity: 1 }, { symbol: 'USD', quantity: 1871 }, ... ]
    
    // let totalPortfolioValue = Number(this.props.cashBalance);
    let totalPortfolioValue = 0;
    let currentPrices = this.props.currentPrices;
    // debugger

    // this.props.currentPrices will be empty {} on first render bec. asynch
    if (currentPrices['BTC'] != undefined) {
      // debugger

      // calculate value of each currency in USD and add key/val pair to each currency object 
      sortedPortfolio = sortedPortfolio.map( (currencyObj) => {
        let symbol = currencyObj.symbol;
        let quantity = Number(currencyObj.quantity);
        let currentPrice;
        // debugger

        // check if currencyObj is USD
        if (currencyObj.symbol === 'USD') {
          currentPrice = 1;
        } else {
          currentPrice = currentPrices[symbol].USD.PRICE;
        }

        let currentValue = quantity * currentPrice;
        currencyObj['USDValue'] = currentValue;
        totalPortfolioValue += currentValue;
        // debugger

        return currencyObj;
      });

      // calculate % asset allocation of each currency and add key/val pair to to each currency object
      sortedPortfolio = sortedPortfolio.map( (currencyObj) => {
        // let symbol = currencyObj.symbol;
        // let quantity = Number(currencyObj.quantity);
        // let currentPrice = this.props.currentPrices[symbol].USD;
        let currentValue = currencyObj.USDValue;
        let percentAllocation = currentValue/totalPortfolioValue;
        currencyObj['percentAllocation'] = percentAllocation;
        return currencyObj;
      })
    }

    return sortedPortfolio;
    // sortedPortfolio ==
    // [
    //   {symbol: 'ETH', quantity: 30, USDValue: 3000, percentAllocation: .60 },
    //   {symbol: 'BTC', quantity: 1, USDValue: 7000, percentAllocation: .20 },
    //   {symbol: 'USD', quantity: 1000, USDValue: 1000, percentAllocation: .10 },
    // ]
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

    // add USD cash to portfolio
    sortedPortfolio.push({symbol: 'USD', quantity: this.props.cashBalance});

    // sort descending
    return sortedPortfolio.sort((a, b) => b.quantity - a.quantity);
  }


  renderSortedRows() {  // sort by asset allocation % high to low, default to coin mkt cap
    let sortedPortfolio = this.sortPortfolio();
    // sortedPortfolio = [ { symbol: 'ETH', quantity: 30 }, { symbol: 'BTC', quantity: 1 }, { symbol: 'LTC', quantity: 0.5 } ]
    let portfolioAssetAllocation = this.calculateAssetAllocation(sortedPortfolio);
    debugger

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