import React from 'react';

class Transactions extends React.Component {
  constructor(props) {
    super(props);

    this.renderTransactions = this.renderTransactions.bind(this);
    this.formatMonth = this.formatMonth.bind(this);
  }


  formatMonth(month) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return months[month];
  }


  renderTransactions() {
    const { transactions } = this.props                           // transactions == array of objects
    
    if (transactions.length === 0) {                              // if there are no transactions
      return null;
    } else {
      return (
        transactions.map( (transaction, i) => {                   // transaction == object, ordered left/right oldest transactions first
          let currency = transaction.currency_symbol;
          let formattedDate = new Date(transaction.created_at);   // JS date object
          let quantity = Math.abs(Number(transaction.quantity)); 
          let price = Number(transaction.price);
          let value = price * quantity;
          let transactionType = transaction.transaction_type;     // string- ex. 'BUY'
          (transactionType == 'BUY') ? (transactionType = 'BOUGHT') : (transactionType = 'SOLD');
          let plusOrMinus;
          (transactionType == 'BOUGHT') ? (plusOrMinus = '-') : (plusOrMinus = '+');
          
          let day = formattedDate.getDate();                      // number- day of month, ex. 22
          let year = formattedDate.getFullYear();                 // number- ex. 2019
          let month = formattedDate.getMonth();                   // number- (from 0-11) ADD +1!!!. ex. 9 ==> october
          month = this.formatMonth(month);                        // string- ex. 'OCT'
          
          return (
            <tr className="transactions-tbody-tr" key={i}>
              <td className="transactions-tbody-td-date">{year} {month} {day}</td>
              <td className="transactions-tbody-td-type">{transactionType} {quantity} {currency}</td>
              <td className="transactions-tbody-td-value">{plusOrMinus}${value}</td>
            </tr>
          );
        })
      );
    }
  }



  render() {
    return (
      <div id="transactions">
        <table className="transactions-table">
          <thead className="transactions-thead">
            <tr className="transactions-thead-tr">
              <th>Date</th>
              <th>Transaction</th>    
              <th>Value</th>
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