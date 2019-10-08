import React from 'react';
import { Link } from 'react-router-dom';
import PricesRow from './prices_row';
import { fetchCurrencyInfo } from '../../util/prices_util';
import { SYMBOLS, NAMES } from './currencies';
// import { fetchDescription } from '../../util/currency_api_util';    // For currency logos

// Before component is rendered, fetch 1) array of all currency tickers and 2) array of all currency names (from database or keep on front end like JS project)
// Render matches function- returned from main component that displays input and search results
// onTextChange function- 1) searches for all matches, and 2) changes matches results state -> 


class PricesPage extends React.Component {
  constructor(props) {
    super(props);

    // Matches array of string symbols
    this.state = {
      // matches: []
      symbolSuggestions: [],
      nameSuggestions: [],
      userInput: "",
      rowData: {},               // ex. { BTC: { PRICE:10861, CHANGEPCT24HOUR:4%, MKTCAP:2.5B}, ETH: {...}... }
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);
  }



  componentDidMount() {
    // If local state doesn't have any row data, get the data for all currencies
    if (Object.keys(this.state.rowData).length === 0) {
      
      // Get batch data (price, %change, marketcap) for all currencies
      fetchCurrencyInfo(SYMBOLS).then(
        response => {
          let newRowData = {};

          // Loop through all symbols array, and populate newRowData object with price, %change, marketcap for each currency
          for (let i = 0; i < SYMBOLS.length; i++) {
            let symbol = SYMBOLS[i];
            newRowData[symbol] = {};
            newRowData[symbol]['PRICE'] = response.DISPLAY[symbol].USD.PRICE;
            newRowData[symbol]['CHANGEPCT24HOUR'] = response.DISPLAY[symbol].USD.CHANGEPCTDAY + '%';
            newRowData[symbol]['MKTCAP'] = response.DISPLAY[symbol].USD.MKTCAP;
            newRowData[symbol]['IMAGEURL'] = response.DISPLAY[symbol].USD.IMAGEURL;
            // debugger
          }

          // Set state of each currency's PRICE, CHANGEPCT24HOUR, MKTCAP
          return this.setState({
            rowData: newRowData // MIGHT NEED TO COPY OTHER STATE KEY/VAL ITEMS!!!!!?????
          });

          //   response == 
          //   { 
          //     RAW: {
          //     },
          //     DISPLAY: {
          //       BTC: { USD: { ...} },
          //       BTH: { USD: { ...} },
          //       ETH: { USD: { ...} }
          //     }
          //   }
          // response.DISPLAY.BTC.USD == {CHANGE24HOUR: , CHANGEDAY:, ...}
        }
      );
    }
  }

  // FROM currency table item
  // componentDidMount() {
  //   this.props.fetchCurrentPrice(this.props.symbol);
  //   fetchDescription(this.props.symbol).then(
  //     (response) => {

  //       return this.setState({
  //         logoPath: response.imageurl
  //       })
  //     }
  //   );
  //   // debugger
  // }




  onTextChange(e) {
    const value = e.target.value;   // user text input string
    let symbolMatches = [];
    let nameMatches = [];

    // Search Algo: O(n) ? searches for ticker/symbol or name (beginning, not substring)
    for (let i = 0; i < SYMBOLS.length; i++) {
      let symbol = SYMBOLS[i];
      let name = NAMES[i];

      // Check if ticker string starts w/ same characters as the users input field
      let inputSymbolMatches = symbol.substr(0, value.length).toUpperCase() == value.toUpperCase();
      let inputNameMatches = name.substr(0, value.length).toUpperCase() == value.toUpperCase();

      // If we have a match
      if (inputSymbolMatches || inputNameMatches) {

        // Add symbol and name to arrays
        symbolMatches.push(symbol);
        nameMatches.push(name);
      }
    }

    // Alter local state with matches arrays
    this.setState({ 
      symbolSuggestions: symbolMatches,
      nameSuggestions: nameMatches,
      userInput: value,
    });
  }



  // renderMatches() {
  renderSuggestions() {
    // Const { matches } = this.state;
    const { symbolSuggestions, nameSuggestions, userInput, rowData } = this.state;
    let whatToMap, nameToMap;

    // This is so we don't repeat code below
    if (userInput === "") {
      whatToMap = SYMBOLS;
      nameToMap = NAMES;
    } else {
      whatToMap = symbolSuggestions;
      nameToMap = nameSuggestions;
    }

    // Return null if there are no search matches (suggestions) AND search input field is NOT empty
    if (symbolSuggestions.length === 0 && userInput !== "") {
      return null;  // No search results found
    } else {    
      return (
        <ul className="search-ul">
          <li className="search-li-header">
            <div id="search-results-header">
              <span className="search-logo-header"></span>
              <span className="search-name-header">Name</span>
              <span className="search-ticker-header">Symbol</span>
              <span className="search-price-header">Price</span>
              <span className="search-change24-header">Change 24HR</span>
              <span className="search-marketCap-header">Market Cap</span>
              <span className="search-trade-header">Trade</span>
            </div>
          </li>
          {whatToMap.map( (symbol, i) => {
            // let name = nameToMap[i].toLowerCase().split(' ').join('');    // remove space in string (if any)
            let name = nameToMap[i].toLowerCase().split(' ').join('-');      // remove space in string (if any)
            let price, percentChange, marketCap, logoPath;
            // debugger

            // On initial page load, local state will be empty, so return null
            if (rowData[symbol] === undefined) {
              price = null;
              percentChange = null;
              marketCap = null;
              logoPath = null;
            } else {
              // Access local state and Set price, %change, and mktcap for each currency so we can pass as props to subcomponent row
              price = rowData[symbol]['PRICE'];
              percentChange = rowData[symbol]['CHANGEPCT24HOUR'];
              marketCap = rowData[symbol]['MKTCAP'];
              logoPath = rowData[symbol]['IMAGEURL'];
            }
            if (name == 'xrapid') name = 'xrp';

            return (
            <li key={i} className="search-li">
                <Link to={`/price/${name}`} className="search-li-link">
                  <PricesRow 
                    key={i + 1} 
                    price={price} 
                    percentChange={percentChange}
                    marketCap={marketCap}
                    nameToMap={nameToMap[i]} 
                    symbol={symbol}
                    logoPath={logoPath}
                  />
                </Link>
                <span className="search-trade"><button className="currency-trade-prices">TRADE</button></span>
            </li>
            );
          })}
        </ul>
      );
    }
  }


  render() {
    return (
      <div id="search-container">
        <input onChange={this.onTextChange} type="text" id="search-bar" placeholder="Search all assets..."/>
        <h2>Availble on Coinspace</h2>
        {this.renderSuggestions()}
        {/* <h2>Not Availble on Coinspace</h2> */}
      </div>
    );
  }
}

export default PricesPage;