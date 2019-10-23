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
		const userId = this.props.state.session.id;
		const { cash_balance, portfolio } = this.props.state.entities.users[userId];
		// debugger

		return (
			<div>
				<h1>WELCOME!</h1>
				<PortfolioChart/>
				<Watchlist/>
				<PortfolioWallets cashBalance={cash_balance} portfolio={portfolio}/>
				<Transactions/>
			</div>
		);
	}
}

export default Dashboard;


