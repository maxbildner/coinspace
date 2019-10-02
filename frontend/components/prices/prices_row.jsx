import React from 'react';
// import { fetchCurrentPrice } from '../../actions/currency_actions';
// import { fetchCurrencyInfo } from '../../actions/currency_actions';
import { fetchCurrentPrices } from '../../util/prices_util';


class PricesRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentChange24HR: null,
      marketCap: null,
    }
  }

  componentDidMount() {

  }

  render() {
    const { nameToMap, symbol, price } = this.props;

    return(
      <>
        <span className="search-ticker">{symbol}</span>
        <span className="search-name">{nameToMap}</span>
        <span className="search-price">{price}</span>
        <span className="search-change24">Change 24HR</span>
        <span className="search-marketCap">Market Cap</span>
      </>
    );
  }
}

export default PricesRow;