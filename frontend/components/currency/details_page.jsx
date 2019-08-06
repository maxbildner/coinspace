import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
	// debugger
	const currencyName = ownProps.match.params.currencyName || {};

	return ({
		currencyName,
		userId: state.session.id		// will be null if no one logged in
	});
}

const mapDispatchToProps = (dispatch) => {
	return ({
		fetchCurrencyDescription: (currencyName) => { 
			return dispatch(fetchCurrencyDescription(currencyName))		// haven't written yet
		}
	});
}



class DetailsPage extends React.Component {
	constructor(props) {
		super(props);
		// debugger
	}
	
	render() {
		return (
			<>
			<div id="detail-wrapper">
				<section id="left-detail">
						<div className="chart-container">
							<h1 className="chart-title">CHART TITLE</h1>
							<div id="chart">CHART</div>
						</div>

						<div id="description-container">
							<div id="description">CHART DESCRIPTION</div>
						</div>

						<div id="news-container">
							<div id="news">NEWS</div>
						</div>
				</section>

				<section id="right-detail">
						<div id="detail-trade">TRADE</div>
				</section>
				
			</div>
				
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage)