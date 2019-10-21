import React from 'react';

// THIS COMPONENT IS A SUBCOMPONENT OF THE HOMEPAGE COMPONENT
class TradeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: this.props.symbol,
      quantity: "Quantity"
    }

    this.handleBuy = this.handleBuy.bind(this);
    this.handleSell = this.handleSell.bind(this);
    this.onChangeSymbol = this.onChangeSymbol.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.hasEnoughCash = this.hasEnoughCash.bind(this);
    this.hasEnoughQuantity = this.hasEnoughQuantity.bind(this);
  }


  onChangeSymbol(event) {
    this.setState({
      symbol: event.target.value
    });
  }


  onChangeQuantity(event) {
    this.setState({
      quantity: event.target.value
    });
  }


  handleBuy() {
    const { symbol, quantity } = this.state;
    const { userId, price } = this.props;
    debugger

    const purchaseData = { 
      user_id: userId, 
      symbol: symbol, 
      quantity: quantity, 
      price: price };

    // Display error if quantity is not a number or negative
    if (isNaN(quantity) || Number(quantity) <= 0) {
      alert('Please enter a valid quantity');

    } else if (this.hasEnoughCash()) {                            // Validate that user cash balance is sufficient 
      this.props.buyCurrency(purchaseData);                       // Send POST (create new wallet transaction) to backend
      alert(`${quantity} ${symbol} was added to your account!`);

    } else {
      alert('You do not have enough buying power!');
    }
  }


  hasEnoughCash() {
    let { symbol, price, cashBalance, portfolio, userId } = this.props;
    const quantity = Number(this.state.quantity);
    
    if (isNaN(price)) {   // if price is a string ex. "$ 8,000.00", remove $ and ','
      price = Number(price.slice(1).split(',').join(''));
    }
    debugger

    // Compute total purchase value = price * quantity
    const totalPurchaseValue = price * quantity;
    debugger

    // Check if user has enough cash to cover totalPurchaseValue
    return (cashBalance >= totalPurchaseValue);
  }



  handleSell() {
    const { symbol, quantity } = this.state;
    let { userId, price } = this.props;

    if (isNaN(price)) {   // if price is a string ex. "$ 8,000.00", remove $ and ','
      price = Number(price.slice(1).split(',').join(''));
    }

    const saleData = {
      user_id: userId,
      symbol: symbol,
      quantity: Number(quantity) * -1.0,
      price: price
    };

    // Display error if quantity is not a number or negative
    if (isNaN(quantity) || Number(quantity) <= 0) {
      alert('Please enter a valid quantity');

    } else if (this.hasEnoughQuantity()) {                            // Validate that user has enough crypto to sell
      this.props.sellCurrency(saleData);                              // Send POST (create new wallet transaction) to backend
      alert(`${quantity} ${symbol} was sold from your account!`);
    } else {
      alert('You do not have enough to sell!');
    }
  }



  hasEnoughQuantity() {
    const { symbol, portfolio } = this.props;
    const quantity = Number(this.state.quantity);
    debugger
    
    // check if user has enough quantity to sell
    return Number(portfolio[symbol]) >= quantity;
  }



  render() {
    // debugger
    const { toggleModal, price } = this.props || {};
    

    return (
      <div id="modal-container">
        <span id="trading-modal-close-button" onClick={toggleModal}>&times;</span>
        {/* <form action=""> */}
          <input id="trading-input-symbol" 
            type="text" 
            placeholder={this.state.symbol}
            onChange={this.onChangeSymbol}/>
          <span>Current Price: <span>{price}</span> </span>
          <input id="trading-input-quantity" 
            type="text" 
            placeholder={this.state.quantity}
            onChange={this.onChangeQuantity}/>
          <button id="trading-modal-buy" onClick={this.handleBuy}>BUY</button>
          <button id="trading-modal-sell" onClick={this.handleSell}>SELL</button>
        {/* </form> */}
      </div>
    );
  }
}
  
export default TradeModal;

