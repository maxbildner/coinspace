import React from 'react';
import { Link } from 'react-router-dom';
import PricesRow from './prices_row';
import { fetchCurrentPrices } from '../../util/prices_util';


// Before component is rendered, fetch 1) array of all currency tickers and 2) array of all currency names (from database or keep on front end like JS project)
// Render matches function- returned from main component that displays input and search results
// onTextChange function- 1) searches for all matches, and 2) changes matches results state -> 

const SYMBOLS = [
  'BTC',
  'ETH',
  'XRP',
  'BCH',
  'LTC'
];

const NAMES = [
  'bitcoin',
  'ethereum',
  'xrapid',
  'bitcoin cash',
  'lite coin'
];

class PricesPage extends React.Component {
  constructor(props) {
    super(props);

    // this.items = [ ];
    // this.currencyTickers = [
    //   'BTC',
    //   'ETH',
    //   'XRP',
    //   'BCH',
    //   'LTC'
    // ];

    // Matches array of string symbols
    this.state = {
      // matches: []
      symbolSuggestions: [],
      nameSuggestions: [],
      userInput: "",
      prices: {}          // ex. { BTC:{USD: 10861}, ETH:{USD: 22.59}, ... }
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }


  componentDidMount() {
    debugger
    // If local state doesn't have any price data, get them
    if (this.state.prices['BTC'] === undefined) {

      debugger

      // Get batch current prices for all symbols- AJAX request
      fetchCurrentPrices(...SYMBOLS).then(
        (response) => {
          debugger
          return this.setState({
            prices: response
          });
        }
      );
    }

    // prices = fetchPrices('BTC', 'ETH', 'XRP');
    // prices.responseJSON //=> 
    // { 
    //     BTC: { USD: 10861.65 }
    //     ETH: { USD: 222.59 }
    //     XRP: { USD: 0.3163 }
    // }

  }


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

      // if we have a match
      if (inputSymbolMatches || inputNameMatches) {

        // add symbol and name to arrays
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


  handleOnClick() {
    // let name = this.props.name.toLowerCase();

    // if (name == 'xrapid') { name = 'xrp' };

    // this.props.history.push(`/price/${name}`);
  }

  // renderMatches() {
  renderSuggestions() {
    // Const { matches } = this.state;
    const { symbolSuggestions, nameSuggestions, userInput, prices } = this.state;
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
              <span className="search-ticker-header">Symbol</span>
              <span className="search-name-header">Name</span>
              <span className="search-price-header">Price</span>
              <span className="search-change24-header">Change 24HR</span>
              <span className="search-marketCap-header">Market Cap</span>
              <span className="search-trade-header">Trade</span>
            </div>
          </li>
          {whatToMap.map( (symbol, i) => {
            let name = nameToMap[i].toLowerCase().split(' ').join('');    // remove space in string (if any)
            let price;

            if (prices[symbol] === undefined) {
              price = null;
            } else {
              debugger
              price = prices[symbol]['USD'];
            }

            return (
            <li key={i} className="search-li">
                <Link to={`/price/${name}`} className="search-li-link">
                  {/* <span key={i + 1} className="search-ticker">{symbol}</span>
                  <span className="search-name">{nameToMap[i]}</span>
                  <span className="search-price">Price</span>
                  <span className="search-change24">Change 24HR</span>
                  <span className="search-marketCap">Market Cap</span> */}
                  <PricesRow key={i + 1} price={price} nameToMap={nameToMap[i]} symbol={symbol}/>
                </Link>
                  <span className="search-trade">Trade</span>
            </li>
            );
          })}
        </ul>
      );
    }
  }


  render() {
    return (
      <div>
        <input onChange={this.onTextChange} type="text" id="search-bar"/>
        <h2>Availble on Coinspace</h2>
        {this.renderSuggestions()}
      </div>
    );
  }
}

export default PricesPage;