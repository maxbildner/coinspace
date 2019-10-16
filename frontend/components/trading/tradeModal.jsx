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
        <button onClick={toggleModal}>CLOSE</button>
        MODAL FORM!!!! {symbol}
      </div>
    );
  }
}
  
export default TradeModal;

