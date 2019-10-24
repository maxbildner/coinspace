import React from 'react';
import { fetchCurrentPrices } from '../../util/prices_util';

const SUPPORTED_CURRENCIES = ['BTC', 'ETH', 'XRP', 'BCH', 'LTC', 'EOS', 'XLM'];
var portfolioValue = null;

class PortfolioWallets extends React.Component {
  constructor(props) {
    super(props);
    // props == { cashBalance, portfolio, currentPrices }
    // currentPrices == ? wrong -> {BTC: {USD: 7649.32, MKTCAP...}, ETH: {USD: 162.16, MKTCAP... }, ... }

    this.sortPortfolioByQuantity = this.sortPortfolioByQuantity.bind(this);
    this.renderSortedRows = this.renderSortedRows.bind(this);
    this.calculateAssetAllocation = this.calculateAssetAllocation.bind(this);
    this.sortPortfolioByUSDValue = this.sortPortfolioByUSDValue.bind(this);
  }


  calculateAssetAllocation(sortedPortfolio) {     // returns new portfolio array of objects by adding %Allocation for each currency
    // sortedPortfolio = [ { symbol: 'USD', quantity: 1 }, { symbol: 'USD', quantity: 1871 }, ... ]
    
    // let totalPortfolioValue = Number(this.props.cashBalance);
    let totalPortfolioValue = 0;
    let currentPrices = this.props.currentPrices;

    // this.props.currentPrices will be empty {} on first render bec. asynch
    if (currentPrices['BTC'] != undefined) {

      // calculate value of each currency in USD and add key/val pair to each currency object 
      sortedPortfolio = sortedPortfolio.map( (currencyObj) => {
        let symbol = currencyObj.symbol;
        let quantity = Number(currencyObj.quantity);
        let currentPrice;

        // check if currencyObj is USD
        if (currencyObj.symbol === 'USD') {
          currentPrice = 1;
        } else {
          currentPrice = currentPrices[symbol].USD.PRICE;
        }

        let currentValue = quantity * currentPrice;
        currencyObj['USDValue'] = currentValue;
        totalPortfolioValue += currentValue;

        return currencyObj;
      });

      // calculate % asset allocation of each currency and add key/val pair to to each currency object
      sortedPortfolio = sortedPortfolio.map( (currencyObj) => {
        let currentValue = currencyObj.USDValue;
        let percentAllocation = currentValue/totalPortfolioValue;

        // round to two decimal places
        percentAllocation = Number(percentAllocation.toFixed(2));
        currencyObj['percentAllocation'] = percentAllocation;
        return currencyObj;
      })
    }

    if (portfolioValue == null && currentPrices['BTC'] != undefined) {
      portfolioValue = totalPortfolioValue;
    }

    return sortedPortfolio;
    // sortedPortfolio ==
    // [
    //   {symbol: 'ETH', quantity: 30, USDValue: 3000, percentAllocation: .60 },
    //   {symbol: 'BTC', quantity: 1, USDValue: 7000, percentAllocation: .20 },
    //   {symbol: 'USD', quantity: 1000, USDValue: 1000, percentAllocation: .10 },
    // ]
  }


  sortPortfolioByQuantity() {           // returns array of objects sorted by asset allocation % high to low, sort by quantity
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


  sortPortfolioByUSDValue(portfolioArray) {
    return portfolioArray.sort( (a,b) => b.USDValue - a.USDValue );
  }


  renderSortedRows() {  // sort by asset allocation % high to low, default to coin mkt cap
    let sortedPortfolio = this.sortPortfolioByQuantity();
    // sortedPortfolio == [ { symbol: 'ETH', quantity: 30 }, { symbol: 'BTC', quantity: 1 }, { symbol: 'LTC', quantity: 0.5 } ]

    let portfolioAssetAllocation = this.calculateAssetAllocation(sortedPortfolio);
    // portfolioAssetAllocation == [ { symbol: 'USD', quantity: 1871.57, USDValue: 1871.57, percentAllocation: 0.20 }, { symbol: 'BTC', quantity: 1, USDValue: 7472, percentAllocation: .799 } ]

    // sort by USDValue
    sortedPortfolio = this.sortPortfolioByUSDValue(portfolioAssetAllocation);
    

    return sortedPortfolio.map( (currencyObj, i) => {
      return (
      <tr key={i}>
        <td>{currencyObj.symbol}</td>
        <td>%{currencyObj.percentAllocation * 100}</td>
        <td>{currencyObj.quantity}</td>
        <td>${currencyObj.USDValue}</td>
      </tr>
      );
    });
  }


  render() {
    // debugger

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Portfolio Wallets</th>
              <th>Asset Allocation</th>
              <th>Quantity</th>
              <th>USD Value</th>
            </tr>
          </thead>
          <tbody>
            {this.renderSortedRows()}
          </tbody>
        </table>
        <div>Total Portfolio Value ≈ {portfolioValue}</div>
      </div>
    );
  }
}

export default PortfolioWallets;