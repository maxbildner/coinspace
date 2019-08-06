import React from 'react';
import { LineChart, Line } from 'recharts';
import { fetchHourly1DayPrices } from '../../util/prices_util';


// For testing only (works)
// const DATA = [{ "time": 1565074800, "close": 12196.78, "high": 12282.38, "low": 12136.56, "open": 12137.72, "volumefrom": 5465.94, "volumeto": 66741143.06 }, { "time": 1565078400, "close": 12205.35, "high": 12272.1, "low": 12193.77, "open": 12196.78, "volumefrom": 1870.42, "volumeto": 22874823.34 }, { "time": 1565082000, "close": 12239.43, "high": 12267.8, "low": 12205.35, "open": 12205.35, "volumefrom": 1665.7, "volumeto": 20384789.08 }, { "time": 1565085600, "close": 11751.74, "high": 12316.85, "low": 11643.85, "open": 12239.43, "volumefrom": 10274.13, "volumeto": 122696445.08 }, { "time": 1565089200, "close": 11779.89, "high": 11827.95, "low": 11675.35, "open": 11751.74, "volumefrom": 3213.46, "volumeto": 37829089.37 }, { "time": 1565092800, "close": 11672.83, "high": 11789.86, "low": 11545.02, "open": 11779.89, "volumefrom": 4575.12, "volumeto": 53331542.6 }, { "time": 1565096400, "close": 11797.43, "high": 11797.54, "low": 11635.92, "open": 11672.83, "volumefrom": 3211.29, "volumeto": 37636031.93 }, { "time": 1565100000, "close": 11737.33, "high": 11798.43, "low": 11681.39, "open": 11797.43, "volumefrom": 1899.8, "volumeto": 22296212.98 }, { "time": 1565103600, "close": 11705.54, "high": 11753.13, "low": 11680.89, "open": 11737.33, "volumefrom": 2105.83, "volumeto": 24674934.5 }, { "time": 1565107200, "close": 11779.62, "high": 11797.87, "low": 11682.45, "open": 11705.54, "volumefrom": 1525.02, "volumeto": 17893380.16 }, { "time": 1565110800, "close": 11712.4, "high": 11829.21, "low": 11705.58, "open": 11779.62, "volumefrom": 2338.32, "volumeto": 27533827.38 }]

class ChartMini extends React.Component {
	constructor(props) {
		super(props);
		this.state = { "1D": [] };

		// this.fetchHourly1DayPrices = this.fetchHourly1DayPrices.bind(this);
		// debugger
	}


	componentDidMount() {
		// debugger
		fetchHourly1DayPrices(this.props.symbol).then(
			(response) => {
				// debugger
				// response.Data == [ {close: 1182, ...}, {} ]
				return this.setState({["1D"]: response.Data})
			}
		) 
	}

	render() {
		return (
			<>
				{/* <LineChart width={100} height={100} data={DATA}> */}
				<LineChart width={100} height={100} data={this.state["1D"]}>
						<Line 
							type="monotone" 
							dataKey="close" 
							dot={false}
							// stroke="#8884d8" 
							// strokeWidth={4}
						/>
				</LineChart>
			</>
		);
	}
}

export default ChartMini;

// import React, { PureComponent } from 'react';
// import {
//     LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts';

// const data = [
//     {
//         name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//     },
//     {
//         name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//     },
//     {
//         name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//     },
//     {
//         name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//     },
//     {
//         name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//     },
//     {
//         name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//     },
//     {
//         name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//     },
// ];

// export default class Example extends PureComponent {
//     static jsfiddleUrl = 'https://jsfiddle.net/alidingling/exh283uh/';
//     render() {
//         return (
//             <LineChart width={300} height={100} data={data}>
//                 <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
//             </LineChart>
//         );
//     }
// }

