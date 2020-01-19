import React from 'react';
import { fetchCurrentPrice } from '../../util/prices_util';

class PricesRow extends React.Component {
  constructor(props) {
    super(props);
    // debugger

    this.state = {
      currentPrice: props.price,
    };
  }

  componentDidMount() {
    const { symbol } = this.props;

    // Get new price every 10 seconds
    setInterval(() => this.getCurrentPrice(symbol), 10000);
  }

  getCurrentPrice(symbol) {
    // debugger
    fetchCurrentPrice(symbol).then(
      (response) => {
        // debugger
        // console.log('Fetched Current Price: ' + `${response.USD}`)						// for testing
        // setTimeout(() => this.setState({ fading: false }), 500);

        return this.setState({
          // currentPrice: response.RAW.PRICE			// old for API that gets average price from multiple exchanges
          currentPrice: formatValue(response.USD),
        });
      }
    );
  }


  render() {
    const { nameToMap, symbol, percentChange, marketCap, logoPath, price } = this.props;
    const { currentPrice } = this.state;

    let actualPrice;
    (currentPrice) ? (actualPrice = currentPrice) : (actualPrice = price);
    // debugger

    let isNegative;
    // if percentChange is negative, add a class to make text red, green otherwise
    if (percentChange == null) {
      isNegative = null;
    } else if (percentChange[0] == '-') {
      isNegative = 'search-change24-negative';
    } else {
      isNegative = 'search-change24-positive';
    }

    // return(
    //   <>
    //     <span className="search-logo">
    //       <img src={'https://www.cryptocompare.com' + logoPath} alt={nameToMap} className="search-currency-logo"/>
    //     </span>
    //     <span className="search-name">{nameToMap}</span>
    //     <span className="search-ticker">{symbol}</span>
    //     <span className="search-price">{price}</span>
    //     <span className={isNegative}>{percentChange}</span>
    //     <span className="search-marketCap">{marketCap}</span>
    //   </>
    // );
    return(
      <>
        <td className="search-logo">
          <img src={'https://www.cryptocompare.com' + logoPath} alt={nameToMap} className="search-currency-logo"/>
        </td>
        <td className="search-name">{nameToMap}</td>
        <td className="search-ticker">{symbol}</td>
        <td className="search-price">{actualPrice}</td>
        {/* <td className="search-price">{price}</td> */}
        <td className={isNegative}>{percentChange}</td>
        <td className="search-marketCap">{marketCap}</td>
      </>
    );
  }
}

export default PricesRow;




// Helper Function
// => returns string "10,526.94"
function formatValue(value) {
  // portfolioValue == 10527.94333333
  if (value) {
    return Number(value.toFixed(2)).toLocaleString();
  }
}