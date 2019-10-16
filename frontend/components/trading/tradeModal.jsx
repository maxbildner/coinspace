import React from 'react';
import { connect } from 'react-redux';

// const mapStateToProps = (state) => {
// }

// const mapDispatchToProps = (dispatch) => {
// }

// connect(mapStateToProps, null)(TradeModal)


class TradeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // debugger
    const { symbol, toggleModal } = this.props || {};

    return (
      <div id="modal-container">
        <span id="trading-modal-close-button" onClick={toggleModal}>&times;</span>
        <input type="text" placeholder={symbol}/>
        <input type="text" placeholder="Quantity"/>
        <button>BUY</button> <button>SELL</button>
      </div>
    );
  }
}
  
export default TradeModal;

