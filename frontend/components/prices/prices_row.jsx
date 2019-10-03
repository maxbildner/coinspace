import React from 'react';
// import { fetchCurrentPrice } from '../../actions/currency_actions';
import { fetchCurrencyInfo } from '../../util/prices_util';


class PricesRow extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     percentChange24HR: null,
  //     marketCap: null,
  //   }
  // }

  // componentDidMount() {
  // }

  render() {
    const { nameToMap, symbol, price, percentChange, marketCap } = this.props;

    return(
      <>
        <span className="search-ticker">{symbol}</span>
        <span className="search-name">{nameToMap}</span>
        <span className="search-price">{price}</span>
        <span className="search-change24">{percentChange}</span>
        <span className="search-marketCap">{marketCap}</span>
      </>
    );
  }
}

export default PricesRow;

