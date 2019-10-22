import React from 'react';
import { Link } from 'react-router-dom';
import PricesRow from './prices_row';
import { fetchCurrencyInfo } from '../../util/prices_util';
import { SYMBOLS, NAMES } from './currencies';
import TradeModal from '../trading/tradeModalContainer';

// Before component is rendered, fetch 1) array of all currency tickers and 2) array of all currency names (from database or keep on front end like JS project)
// Render matches function- returned from main component that displays input and search results
// onTextChange function- 1) searches for all matches, and 2) changes matches results state -> 


class PricesPage extends React.Component {
  constructor(props) {
    super(props);

    // Matches array of string symbols
    this.state = {
      symbolSuggestions: [],
      nameSuggestions: [],
      userInput: "",
      rowData: {},               // ex. { BTC: { PRICE:10861, CHANGEPCT24HOUR:4%, MKTCAP:2.5B}, ETH: {...}... }
      modalOn: false,
      symbolClicked: 'test',
      priceClicked: 'test'
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.triggerModal = this.triggerModal.bind(this);
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
        <table className="search-table">
          <tr className="search-tr-header">
            {/* <div id="search-results-header"> */}
              <td className="search-logo-header"></td>
              <td className="search-name-header">Name</td>
              <td className="search-ticker-header">Symbol</td>
              <td className="search-price-header">Price</td>
              <td className="search-change24-header">Change 24HR</td>
              <td className="search-marketCap-header">Market Cap</td>
              <td className="search-trade-header">Trade</td>
            {/* </div> */}
          </tr>
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
            <tr key={i} className="search-tr">
                <Link to={`/price/${name}`} className="search-tr-link">
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
                <td className="search-trade">
                  <button 
                    className="currency-trade-prices" 
                    onClick={()=> this.triggerModal(symbol, price)}>
                    TRADE
                  </button>
                </td>
            </tr>
            );
          })}
        </table>
      );
    }
  }



  triggerModal(symbol, price) {
    const state = getState();
    // debugger

    // If user is NOT logged in, redirect to Sign Up Page
    if (state.session.id == null) {
      alert('You must be signed in to trade');
      this.props.history.push('/signup');
    } else {																						// If user IS logged in, 
      // Toggle local state of modal to true
      this.setState({
        modalOn: true,
        symbolClicked: symbol,
        priceClicked: price
      });
    }
  }

  renderModal() {
    const { symbolClicked, priceClicked } = this.state;

    // If modal toggle true, display modal
    if (this.state.modalOn) {
      return <TradeModal symbol={symbolClicked} toggleModal={this.hideModal} price={priceClicked} />
    } else {
      return null;
    }
  }

  hideModal() {
    this.setState({
      modalOn: false
    });
  }




  render() {
    return (
      <div id="search-container">
        <input onChange={this.onTextChange} type="text" id="search-bar" placeholder="Search all assets..."/>
        <h2>Availble on Coinspace</h2>
        {this.renderModal()}
        {this.renderSuggestions()}
        {/* <h2>Not Availble on Coinspace</h2> */}
      </div>
    );
  }
}

export default PricesPage;