import React from 'react';
import PortfolioChart from './portfolio_chart';
import Watchlist from './watchlist';
import PortfolioWallets from './portfolio_wallets';
import Transactions from './transactions';
import { fetchCurrencyInfo } from '../../util/prices_util';
const SUPPORTED_CURRENCIES = ['BTC', 'ETH', 'XRP', 'BCH', 'LTC', 'EOS', 'XLM'];


class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		// props == entire redux store

		this.state = {
			currentPrices: null,		// { BTC: 8000, ETH: 162... }
		}

		this.getCurrentPrices = this.getCurrentPrices.bind(this);
	}


	componentDidMount() {
		if (this.state.currentPrices == null) {	
			this.getCurrentPrices();
		}
	}


	getCurrentPrices() {
		fetchCurrencyInfo(SUPPORTED_CURRENCIES).then(
			(response) => {
				// response.RAW == {BTC: {USD: 7649.32, MKTCAP...}, ETH: {USD: 162.16, MKTCAP... }, ... }

				return this.setState({
					currentPrices: response.RAW
				});
			}
		)
	}


	render() {
		const userId = this.props.state.session.id;
		const { 
			cash_balance, 
			portfolio,
			transactions,
		} = this.props.state.entities.users[userId] || {};
		// debugger

		const currentPrices = this.state.currentPrices || {};

		return (
			<div id="dashboard-container">
				<h1>WELCOME!</h1>
				<PortfolioChart/>
				<Watchlist/>

				<div id="wallets-transactions-container">
					<PortfolioWallets 
						cashBalance={cash_balance} 
						portfolio={portfolio} 
						currentPrices={currentPrices}
					/>
					<Transactions
						transactions={transactions}
					/>
				</div>
			</div>
		);
	}
}

export default Dashboard;


