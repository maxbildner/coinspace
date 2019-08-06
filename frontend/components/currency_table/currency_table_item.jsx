import React from 'react';
import { Fragment } from 'react';

class CurrencyTableItem extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {}
        // this.state = {
        //     entities: { 
        //         currentPrice: {
        //             price: null,
        //             changePct24HR: null   
        //         }
        //     }
        // }
        // debugger

    }


    componentDidMount() {
        this.props.fetchCurrentPrice(this.props.symbol);
        // debugger
    }

    render() {                      
        // const { price, changePct24HR } = this.state;

        const { price, changePct24HR } = this.props;    // WORKS
        // debugger

        return (            
            <>
                <tr>
                    <td>{this.props.idx + 1}</td>
                    <td>{this.props.name} {this.props.symbol}</td>
                    <td>{price}</td>
                    <td>{changePct24HR}</td>
                    {/* <td>{this.props.chart}</td> */}
                    <td><button>TRADE</button></td>
                </tr>

            </>
        );
    }
}

export default CurrencyTableItem;