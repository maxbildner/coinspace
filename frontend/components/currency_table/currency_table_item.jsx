import React from 'react';
import ChartMini from './chart_mini';
import roundTo from 'round-to'
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { fetchDescription } from '../../util/currency_api_util';
// import handleTradeClick from '../trading/handle_trade_click';

class CurrencyTableItem extends React.Component {
	constructor(props) {
		super(props); 

		this.state = {
			logoPath: ''
		}
		this.handleOnClick = this.handleOnClick.bind(this);
		this.handleTradeClick = this.handleTradeClick.bind(this);
	}


	componentDidMount() {
		// Get new price every 10 seconds
		// setInterval(() => this.props.fetchCurrentPrice(this.props.symbol), 10000);
		this.props.fetchCurrentPrice(this.props.symbol);

		fetchDescription(this.props.symbol).then(
			(response) => {
					
				return this.setState({
					logoPath: response.imageurl
				})
			}
		);
		// debugger
	}


	handleOnClick(e) {
		// debugger

		// Go to show/detail page only if user does NOT click on trade button
		if (e.target.innerText !== 'TRADE') {
			let name = this.props.name.toLowerCase();
	
			if (name == 'xrapid') { name = 'xrp' };
	
			this.props.history.push(`/price/${name}`);
		}
	}


	handleTradeClick(symbol, price) {
		// If user is NOT logged in, redirect to Sign Up Page
		if (this.props.sessionId === null) {
			alert('You must be signed in to trade');
			this.props.history.push('/signup');
		} else {																						// If user IS logged in, 
			// Call function passed in through props
			this.props.triggerModalParent(symbol, price);
		}
	}


	render() {                      
		// const { price, changePct24HR } = this.state;         // DOESN'T WORK
		// const { price, changePct24HR } = this.props;         // DOESN'T WORK IF 
		// // REDUCER/MAP STATE TO PROPS NOT SET UP RIGHT


		// const { price, changePct24HR, symbol } = this.props;         // WORKS
		let { price, changePct24HR, symbol, name } = this.props || {};    
		const changePctRounded = roundTo(Number.parseFloat(changePct24HR), 2);
		// const logoPath = `/assets/${symbol.toLowerCase()}.png`;
		// if (name == 'XRapid') name = 'xrp';
		// name = name.toLowerCase();

		price = (Number(price)).toLocaleString();

		return (            
			<> 
				<tr className="mini-table-row" onClick={this.handleOnClick}> 
					<td>{this.props.idx + 1}</td>
					<td>
						<Link to={`/price/${name.toLowerCase()}`} className="chart-mini-currency-name">
							<img src={this.state.logoPath} alt={this.props.name} className="currency-logo"/>
							
							<span className="currency-name">{name} </span>    
							<span className="currency-symbol">{symbol}</span>    
						</Link>
					</td>
					<td>{price}</td>
					<td>{changePctRounded}%</td>
					<td><ChartMini symbol={symbol}/></td>
					<td><button className="currency-trade" onClick={() => this.handleTradeClick(symbol, price)}>TRADE</button></td>
				</tr>

			</>
		);
	}
}

export default withRouter(CurrencyTableItem);


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