import React from 'react';
import ChartMini from './chart_mini';

class CurrencyTableItem extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {}
    }


    componentDidMount() {
        this.props.fetchCurrentPrice(this.props.symbol);
        // debugger
    }

    render() {                      
        // const { price, changePct24HR } = this.state; // DOESN'T WORK
        // const { price, changePct24HR } = this.props;    // DOESN'T WORK IF 
        // // REDUCER/MAP STATE TO PROPS NOT SET UP RIGHT


        const { price, changePct24HR } = this.props;    // WORKS
        // debugger

        return (            
            <>
                <tr>
                    <td>{this.props.idx + 1}</td>
                    <td>{this.props.name} {this.props.symbol}</td>
                    <td>{price}</td>
                    <td>{changePct24HR}</td>
                    <td><ChartMini/></td>
                    <td><button>TRADE</button></td>
                </tr>

            </>
        );
    }
}

export default CurrencyTableItem;