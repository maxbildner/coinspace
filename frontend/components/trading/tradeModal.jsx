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
    const { symbol } = this.props || {};

    return (
      <div>
        MODAL FORM!!!! {symbol}
      </div>
    );
  }
}
  
export default TradeModal;

