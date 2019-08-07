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


        const { price, changePct24HR, symbol } = this.props;    // WORKS
        // debugger

        return (            
            <>
                <tr>
                    <td>{this.props.idx + 1}</td>
                    <td>{this.props.name} {symbol}</td>
                    <td>{price}</td>
                    <td>{changePct24HR}</td>
                    <td><ChartMini symbol={symbol}/></td>
                    <td><button>TRADE</button></td>
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