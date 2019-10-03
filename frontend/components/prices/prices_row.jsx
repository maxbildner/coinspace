import React from 'react';


class PricesRow extends React.Component {
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

