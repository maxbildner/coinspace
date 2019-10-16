import React from 'react';
import { connect } from 'react-redux';

// const mapStateToProps = (state) => {
// }

// const mapDispatchToProps = (dispatch) => {
// }

// connect(mapStateToProps, null)(TradeModal)


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
    debugger
  }


  handleSell() {
    debugger
  }


  render() {
    // debugger
    const { toggleModal } = this.props || {};

    return (
      <div id="modal-container">
        <span id="trading-modal-close-button" onClick={toggleModal}>&times;</span>
        {/* <form action=""> */}
          <input id="trading-input-symbol" 
            type="text" 
            placeholder={this.state.symbol}
            onChange={this.onChangeSymbol}/>
          <input id="trading-input-quantity" 
            type="text" 
            placeholder={this.state.quantity}
            onChange={this.onChangeQuantity}/>
          <button id="trading-modal-buy" onClick={this.handleBuy}>BUY</button>
          <button id="trading-modal-buy" onClick={this.handleSell}>SELL</button>
        {/* </form> */}
      </div>
    );
  }
}
  
export default TradeModal;

