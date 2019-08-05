import React from 'react';
import { Fragment } from 'react';

class CurrencyTableItem extends React.Component {
    constructor(props) {
        super(props);
// 
        // debugger

        this.getName = this.getName.bind(this);
    }

    getName() {
        switch (this.props.symbol) {
            case 'BTC':
                return 'Bitcoin';
            case 'ETH':
                return 'Ethereum';
            case 'XRP':
                return 'Bitcoin';
            default:
                return 'unknown';
        }
    }

    componentDidMount() {
        this.props.fetchCurrentPrice(this.props.symbol);
    }

    render() {                      
        // React.Fragment sort of like <> but lets us use other props like key=""
        // debugger
        return (            
            <>
                <React.Fragment key="name">
                    {this.getName()}
                </React.Fragment>
                <React.Fragment key="symbol">
                    {this.props.symbol}
                </React.Fragment>
                <React.Fragment key="price">
                    {this.props.price}
                </React.Fragment>
                <React.Fragment key="change">
                    {this.props.changePct24HR}
                </React.Fragment>
                {/* <React.Fragment key="chart">
                    {this.state.price}
                </React.Fragment> */}
            </>
        );
    }
}

export default CurrencyTableItem;