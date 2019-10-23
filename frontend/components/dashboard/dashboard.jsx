import React from 'react';
import PortfolioChart from './portfolio_chart';
import Watchlist from './watchlist';
import PortfolioWallets from './portfolio_wallets';
import Transactions from './transactions';


class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		debugger
		
		return (
			<div>
				<h1>WELCOME!</h1>
				<PortfolioChart/>
				<Watchlist/>
				<PortfolioWallets/>
				<Transactions/>
			</div>
		);
	}
}

export default Dashboard;


