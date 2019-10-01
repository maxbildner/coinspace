import React from 'react';

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
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);
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

      // debugger

      // if we have a match
      if (inputSymbolMatches || inputNameMatches) {

        // add symbol and name to arrays
        symbolMatches.push(symbol);
        nameMatches.push(name);
      }
    }
    // debugger

    // debugger
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
    const { symbolSuggestions, nameSuggestions, userInput } = this.state;
    
    // debugger
    // Grab input value
    // let inputVal = document.getElementById("search-bar").value;

    // if array of matches empty
    // if (matches.length === 0) {
    if (userInput === "") {
      return (
        <ul>
          {NAMES.map((currency, i) => {
            return (
              <li key={i}>
                <span key={i + 1} className="search-ticker">{currency}</span>
              </li>
            );
          })}
        </ul>
      );
    } else if (symbolSuggestions.length === 0) {
      return null;
    } else {    
      return (
        <ul>
          {nameSuggestions.map( (currency, i) => {
            return (
            <li key={i}>
              <span key={i+1} className="search-ticker">{currency}</span>
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