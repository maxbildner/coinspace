import React from 'react';
import { Fragment } from 'react';
import CurrencyTableItemContainer from './currency_table_item_container';

class CurrencyTable extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        
    }

    componentDidMount() {
        // fetch currencies from database to get ID's and corresonding symbols
        // write fetch all currencies action to go to DB (in actions folder)
    }

    render() {
        const { children } = this.props     // children == [{…}, {…}, {…}]
        // [ {
        //     0: { props: {symbol: 'BTC'} }...
        //     1: { props: {symbol: 'ETH'} }..
        // }]


        // debugger
        return (
            <>
                <table className="currencies">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>price</th>
                            <th>change</th>
                            <th>chart</th>
                            <th>trade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {React.Children.toArray(children).map((child, idx) => (
                            <Fragment key={idx}>
                                <tr key={idx}>
                                    <td>{idx}</td>
                                    <td>{child.name} {child.props.symbol}</td>
                                    <td>{child.props.price}</td>
                                    <td>{child.props.change}</td>
                                    <td>{child.chart}</td>
                                    <td><button>TRADE</button></td>
                                </tr>
                            </Fragment>
                        ))} */}
                        <tr>
                            <td></td>
                            <td><CurrencyTableItemContainer symbol="BTC" /></td>
                            <td><CurrencyTableItemContainer symbol="ETH" /></td>
                            <td><CurrencyTableItemContainer symbol="XRP" /></td>
                            <td><button>TRADE</button></td>
                        </tr>
                        
                    </tbody>
                </table>
            </>
        );
    }
}

export default CurrencyTable;