import React from 'react';

class PortfolioWallets extends React.Component {
  constructor(props) {
    super(props);

    this.sortPortfolio = this.sortPortfolio.bind(this);
    this.renderSortedRows = this.renderSortedRows.bind(this);
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
    supported_currencies = [ 'BTC', 'ETH', 'XRP', 'BCH', 'LTC', 'EOS', 'XLM'];
    const sortedPortfolio = this.sortPortfolio();

    return sortedPortfolio.map( currencyObj => {
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    });
  }


  render() {
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