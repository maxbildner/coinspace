import React from 'react';


class PricesRow extends React.Component {
  render() {
    const { nameToMap, symbol, price, percentChange, marketCap } = this.props;

    let isNegative;
    // if percentChange is negative, add a class to make text red, green otherwise
    if (percentChange == null) {
      isNegative = null;
    } else if (percentChange[0] == '-') {
      isNegative = 'search-change24-negative';
    } else {
      isNegative = 'search-change24-positive';
    }

    return(
      <>
        <span className="search-ticker">{symbol}</span>
        <span className="search-name">{nameToMap}</span>
        <span className="search-price">{price}</span>
        <span className={isNegative}>{percentChange}</span>
        <span className="search-marketCap">{marketCap}</span>
      </>
    );
  }
}

export default PricesRow;

