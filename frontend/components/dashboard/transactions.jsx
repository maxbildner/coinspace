import React from 'react';

class Transactions extends React.Component {
  constructor(props) {
    super(props);

    this.renderTransactions = this.renderTransactions.bind(this);
  }


  renderTransactions() {
    
    return (
      <tr className="transactions-tbody-tr">
        <td>date</td>
        <td>sold btc</td>
        <td>1</td>
      </tr>
    );
  }



  render() {
    return (
      <div id="transactions">
        <table className="transactions-table">
          <thead className="transactions-thead">
            <tr className="transactions-thead-tr">
              <th>Date</th>
              <th>Transaction</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody className="transactions-tbody">
            {this.renderTransactions()}
          </tbody>
        </table>
        <div className="transactions-bottom">View your accounts</div>
      </div>
    );
  }
}

export default Transactions;