import React from 'react';
import { connect } from 'react-redux';
import { 
	fetchHourly1DayPrices,
	fetch1MonthPrices,
 } from '../../util/prices_util';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

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


const DATA1M = [{ "time": 1562457600, "close": 306.43, "high": 310.72, "low": 284.46, "open": 287.98, "volumefrom": 331494.23, "volumeto": 99666457.6 }, { "time": 1562544000, "close": 313.34, "high": 314.94, "low": 302.56, "open": 306.43, "volumefrom": 374097.05, "volumeto": 115496166.88 }, { "time": 1562630400, "close": 307.89, "high": 318.32, "low": 303.09, "open": 313.34, "volumefrom": 404444.05, "volumeto": 125850428.68 }, { "time": 1562716800, "close": 288.64, "high": 314.74, "low": 281.62, "open": 307.89, "volumefrom": 610500.01, "volumeto": 180940011.77 }, { "time": 1562803200, "close": 268.56, "high": 288.66, "low": 263, "open": 288.64, "volumefrom": 629439.43, "volumeto": 171079615.45 }, { "time": 1562889600, "close": 275.41, "high": 279.06, "low": 266.46, "open": 268.56, "volumefrom": 280208.9, "volumeto": 76685542.26 }, { "time": 1562976000, "close": 268.94, "high": 275.72, "low": 261.81, "open": 275.41, "volumefrom": 249274.1, "volumeto": 66861426.61 }, { "time": 1563062400, "close": 226.16, "high": 269.59, "low": 223.07, "open": 268.94, "volumefrom": 728976.05, "volumeto": 175331440.46 }, { "time": 1563148800, "close": 228.14, "high": 235.48, "low": 203.63, "open": 226.16, "volumefrom": 1013350.33, "volumeto": 226218116.46 }, { "time": 1563235200, "close": 198.71, "high": 234.28, "low": 191.03, "open": 228.14, "volumefrom": 1112504.13, "volumeto": 232180403.8 }, { "time": 1563321600, "close": 211.29, "high": 219.84, "low": 192.48, "open": 198.71, "volumefrom": 788919.61, "volumeto": 162154895.01 }, { "time": 1563408000, "close": 226.09, "high": 229.65, "low": 206.32, "open": 211.29, "volumefrom": 653923.33, "volumeto": 142904884.96 }, { "time": 1563494400, "close": 221.28, "high": 226.51, "low": 214.01, "open": 226.09, "volumefrom": 374753.46, "volumeto": 82409808.32 }, { "time": 1563580800, "close": 228.71, "high": 235.69, "low": 220.33, "open": 221.28, "volumefrom": 324652.44, "volumeto": 74318209.77 }, { "time": 1563667200, "close": 225.4, "high": 229.69, "low": 217.43, "open": 228.71, "volumefrom": 266556.13, "volumeto": 59548497.11 }, { "time": 1563753600, "close": 217.22, "high": 227.99, "low": 211.88, "open": 225.4, "volumefrom": 337131.38, "volumeto": 73718555.78 }, { "time": 1563840000, "close": 212.21, "high": 219.1, "low": 208.55, "open": 217.22, "volumefrom": 328148.57, "volumeto": 69993297.42 }, { "time": 1563926400, "close": 216.66, "high": 218.14, "low": 201.32, "open": 212.21, "volumefrom": 461977.64, "volumeto": 96519402.36 }, { "time": 1564012800, "close": 219.41, "high": 225.58, "low": 215.73, "open": 216.66, "volumefrom": 290086.51, "volumeto": 64183254.14 }, { "time": 1564099200, "close": 219.23, "high": 220.88, "low": 212.99, "open": 219.41, "volumefrom": 215332.24, "volumeto": 46712261.33 }, { "time": 1564185600, "close": 207.17, "high": 223.83, "low": 202.84, "open": 219.23, "volumefrom": 369772.96, "volumeto": 78126135.79 }, { "time": 1564272000, "close": 211.15, "high": 213.27, "low": 197.96, "open": 207.17, "volumefrom": 231954.63, "volumeto": 47846437.2 }, { "time": 1564358400, "close": 210.83, "high": 215.03, "low": 206.43, "open": 211.15, "volumefrom": 217677.6, "volumeto": 45830094.98 }, { "time": 1564444800, "close": 209.82, "high": 214.39, "low": 204.58, "open": 210.83, "volumefrom": 163905.97, "volumeto": 34387958.79 }, { "time": 1564531200, "close": 218.7, "high": 218.98, "low": 209.73, "open": 209.82, "volumefrom": 212060.61, "volumeto": 45601288.97 }, { "time": 1564617600, "close": 217.51, "high": 219.28, "low": 211.04, "open": 218.7, "volumefrom": 187353.48, "volumeto": 40239508.23 }, { "time": 1564704000, "close": 217.7, "high": 222.66, "low": 214.99, "open": 217.51, "volumefrom": 209180.55, "volumeto": 45725495.69 }, { "time": 1564790400, "close": 222.02, "high": 224.6, "low": 216.25, "open": 217.7, "volumefrom": 183417.15, "volumeto": 40674495.72 }, { "time": 1564876800, "close": 222.7, "high": 223.65, "low": 217.5, "open": 222.02, "volumefrom": 114461.74, "volumeto": 25241603.35 }, { "time": 1564963200, "close": 233.19, "high": 236.66, "low": 222.7, "open": 222.7, "volumefrom": 386277.04, "volumeto": 89350182.76 }, { "time": 1565049600, "close": 224.13, "high": 239.54, "low": 222.67, "open": 233.19, "volumefrom": 358041.93, "volumeto": 82559841.56 }]
fetchHourly1DayPrices


class DetailsPage extends React.Component {
	constructor(props) {
		super(props);
		// debugger
		this.state = {
			"1D": [],
			"1W": [],
			"1M": [],
			"1Y": [],
			"decription": '',
			"timePeriodActive": ''
		}

		this.get1YearPrices = this.get1YearPrices.bind(this);
		this.get1MonthPrices = this.get1MonthPrices.bind(this);
		this.get1WeekPrices = this.get1WeekPrices.bind(this);
		this.get1DayPrices = this.get1DayPrices.bind(this);
	}

	componentDidMount() {
		debugger
		if (this.state.timePeriodActive != "month") {
			debugger
			fetch1MonthPrices('ETH').then(
				(response) => {
					return this.setState({
						["1M"]: response.Data,
						"timePeriodActive": 'month'
					});
				}
			)
		}
	}


	get1DayPrices() {
		// console.log('1DAY');
		debugger
		fetchHourly1DayPrices('ETH').then(
			(response) => {
				debugger
				return this.setState({
					["1D"]: response.Data,
					"timePeriodActive": "day"
				});
			}
		)
	}

	get1WeekPrices() {
		// console.log('1WEEEK');
		this.setState({
			"timePeriodActive": "week"
		});
	}

	get1MonthPrices() {
		// console.log('1MONTH');
		fetch1MonthPrices('ETH').then(
			(response) => {
				return this.setState({
					["1M"]: response.Data,
					"timePeriodActive": "month"
				});
			}
		)
	}

	get1YearPrices() {
		// console.log('1YEAR');
		this.setState({
			"timePeriodActive": "year"
		});
	}


	
	render() {

		const { timePeriodActive } = this.state;
		let dataPeriod;

		switch (timePeriodActive) {
			case "day":
				// debugger
				dataPeriod = "1D";
				break;								// NEED BREAK STATEMENTS OR ELSE dataPeriod gets overwritten!!
			case "week":
				// debugger
				dataPeriod = "1W";
				break;
			case "month":
				// debugger
				dataPeriod = "1M";
				break;
			case "year":
				// debugger
				dataPeriod = "1Y";
				break;
			// default:
			// 	dataPeriod = "1M";
		}
		
		debugger

		return (
			<>
			<div id="detail-wrapper">
				<section id="left-detail">
					<div className="chart-container">
						<h1 className="chart-title">CHART TITLE</h1>
						<div id="chart">
							{/* <LineChart width={500} height={500} data={this.state["1M"]}> */}
							<LineChart width={500} height={500} data={this.state[dataPeriod]}>
								<Tooltip />
								<Line
									type="monotone"
									dataKey="close"
									dot={false}
									activeDot={{ r: 8 }}
								// stroke="#8884d8" 
								// strokeWidth={4}
								/>
							</LineChart>
							<div id="timeframe">
								<ul id="time-periods">
									<li className={timePeriodActive} onClick={() => this.get1DayPrices()}>1D</li>
									<li className={timePeriodActive} onClick={() => this.get1WeekPrices()}>1W</li>
									<li className={timePeriodActive} onClick={() => this.get1MonthPrices()}>1M</li>
									<li className={timePeriodActive} onClick={() => this.get1YearPrices()}>1Y</li>
								</ul>
							</div>
						</div>
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