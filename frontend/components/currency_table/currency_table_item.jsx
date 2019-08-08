import React from 'react';
import ChartMini from './chart_mini';
import roundTo from 'round-to'
import { Link, Route, Switch } from 'react-router-dom';

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
        // const { price, changePct24HR } = this.state;         // DOESN'T WORK
        // const { price, changePct24HR } = this.props;         // DOESN'T WORK IF 
        // // REDUCER/MAP STATE TO PROPS NOT SET UP RIGHT


        // const { price, changePct24HR, symbol } = this.props;         // WORKS
        let { price, changePct24HR, symbol, name } = this.props;    
        const changePctRounded = roundTo(Number.parseFloat(changePct24HR), 2);
        const logoPath = `/assets/${symbol.toLowerCase()}.png`
        if (name == 'XRapid') name = 'xrp';
        name = name.toLowerCase();

        return (            
            <>
                <tr>
                    <td>{this.props.idx + 1}</td>
                    <td>
                        <Link to={`/price/${name}`}>
                            <img src={logoPath} alt={this.props.name} className="currency-logo"/>
                            {/* <span className="currency-name">{this.props.name} </span>     */}
                            <span className="currency-name">{name} </span>    
                            <span className="currency-symbol">{symbol}</span>    
                        </Link>
                    </td>
                    <td>{price}</td>
                    <td>{changePctRounded}%</td>
                    <td><ChartMini symbol={symbol}/></td>
                    <td><button className="currency-trade">TRADE</button></td>
                </tr>

            </>
        );
    }
}

export default CurrencyTableItem;


// export default class Example extends PureComponent {
//     static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

//     render() {
//         return (
//             <LineChart
//                 width={500}
//                 height={300}
//                 data={data}
//                 margin={{
//                     top: 5, right: 30, left: 20, bottom: 5,
//                 }}
//             >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
//                 <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//             </LineChart>
//         );
//     }
// }