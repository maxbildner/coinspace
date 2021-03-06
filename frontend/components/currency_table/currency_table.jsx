import React from 'react';
import { Fragment } from 'react';
import CurrencyTableItemContainer from './currency_table_item_container';

class CurrencyTable extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        
        this.triggerModalGrandparent = this.triggerModalGrandparent.bind(this);
    }

    componentDidMount() {       // ? why dispatch here and not in child component?
        // fetch currencies from database to get ID's and corresonding symbols

        // write fetch all currencies action to go to DB (in actions folder)
    }

    triggerModalGrandparent(symbol, price) {
        this.props.triggerModal(symbol, price);
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
                    <colgroup>
                        <col className="currency-id"/>
                        <col className="currency-name"/>
                        <col className="currency-price"/>
                        <col className="currency-change"/>
                        <col className="currency-chart"/>
                        <col className="currency-trade"/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">name</th>
                            <th scope="col">price</th>
                            <th scope="col">change</th>
                            <th scope="col">chart</th>
                            <th scope="col">trade</th>
                        </tr>
                    </thead>
                    <tbody>
            
                        {this.props.currencies.map((currency, idx) => { 
                            return <CurrencyTableItemContainer 
                                idx={idx} 
                                {...currency}
                                triggerModalParent={(symbol, price) => this.triggerModalGrandparent(symbol, price)}
                                />
                        })}

                    </tbody>
                </table>
            </>
        );
    }
}

export default CurrencyTable;