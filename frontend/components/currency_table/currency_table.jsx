import React from 'react';
import { Fragment } from 'react';
import CurrencyTableItemContainer from './currency_table_item_container';

class CurrencyTable extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        
    }

    componentDidMount() {       // ? why dispatch here and not in child component?
        // fetch currencies from database to get ID's and corresonding symbols

        // write fetch all currencies action to go to DB (in actions folder)
    }

    render() {
        // const { children } = this.props     // children == [{…}, {…}, {…}]
        // [ {
        //     0: { props: {symbol: 'BTC'} }...
        //     1: { props: {symbol: 'ETH'} }..
        // }]

        // const symbols = ['BTC', 'ETH', 'XRP', 'LTC'];
        // const tableRows = symbols.map((symbol, idx) => {
        //     return (
        //         <tr key={idx}>
        //             <CurrencyTableItemContainer key={idx} symbol={symbol}/>
        //         </tr>
        //     )
        // });

        // debugger
        // this.props.currencies == [
        //     { name: "Bitcoin", symbol: "BTC", key: "BTC" },
        //     { name: "Ethereum", symbol: "ETH", key: "ETH" },
        //     { name: "XRapid", symbol: "XRP", key: "XRP" },
        //     { name: "Litecoin", symbol: "LTC", key: "LTC" },
        // ];
        
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
                                    <td>{idx + 1}</td>
                                    <td>{child.name} {child.props.symbol}</td>
                                    <td>{child.props.price}</td>
                                    <td>{child.props.change}</td>
                                    <td>{child.chart}</td>
                                    <td><button>TRADE</button></td>
                                </tr>
                            </Fragment>
                        ))} */}
                        {/*  */}

                       
                        {this.props.currencies.map((currency, idx) => <CurrencyTableItemContainer idx={idx} {...currency}/>)}
                       
                        

                        {/* {tableRows} */}


                        {/* <tr>
                            <td>0</td>
                            <td>Bitcoin</td>
                            <td> <CurrencyTableItemContainer symbol="BTC"/> </td>
                            <td> <CurrencyTableItemContainer symbol="BTC"/> </td>
                            <td> <CurrencyTableItemContainer symbol="XRP"/> </td>
                            <td> <button>TRADE</button> </td>
                        </tr> */}

                    </tbody>
                </table>
            </>
        );
    }
}

export default CurrencyTable;