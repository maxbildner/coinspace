import React from 'react';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import CurrencyTable from './currency_table/currency_table';
import CurrencyTableItemContainer from './currency_table/currency_table_item_container';

const CURRENCIES = [
		{ name: "Bitcoin", symbol: "BTC", key: "BTC"}, 
		{ name: "Ethereum", symbol: "ETH", key: "ETH"},
		{ name: "XRapid", symbol: "XRP", key: "XRP"}, 
		{ name: "Litecoin", symbol: "LTC", key: "LTC"},
];

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.carousel = React.createRef();
		this.currencyTable = React.createRef();
		this.interval = false;
	}
	

	componentDidMount() {
		let carousel = $(this.carousel.current);
		let slides = carousel.find('.slide');
		let tabs = carousel.find('ul.carousel-tabs > li');			// array-like of all tabs
		let label = carousel.find('.carousel-slide-label');
		let slideCount = slides.length;
		let rotateSlide = () => {
			let activeSlide = slides.filter('.active');
			let activeSlideIdx = (activeSlide.length > 0) ? slides.index(activeSlide) : -1;
			let newSlideIdx = (activeSlideIdx + 1) % slideCount;
			let newSlide = $(slides.get(newSlideIdx));
			let newSlideTab = $(tabs.get(newSlideIdx));
			if (activeSlideIdx >= 0) activeSlide.removeClass('active');
			newSlide.addClass('active');
			label.text(newSlideTab.text());
		};
		rotateSlide();
		this.interval = window.setInterval(rotateSlide, 5000);		// 5 seconds 
	}


	componentWillUnmount() {
		if (this.interval) window.clearInterval(this.interval);
	}


	render() {
		
		return (
			<>
				<div className="carousel" ref={this.carousel}> 
					<div className="slide"><img src="https://www.spacex.com/sites/spacex/files/bfrlunar_v2.jpg" className="background-img" alt="outer space"/></div>
					<div className="slide"><img src="https://i.imgur.com/LxGUNGt.png" className="background-img" alt="new york"/></div>
					<div className="slide"><img src="https://i.imgur.com/wLrUncM.jpg" className="background-img" alt="bank vault"/></div>

					<div className="carousel-bottom">
						<div className="carousel-description">
							<div className="carousel-slide-label"></div>
							<div className="carousel-bottom-action">
								{/* <button className="sign-up-home">Sign Up</button> */}
								<NavLink to='/signup' className="sign-up-home">Sign Up</NavLink>
							</div>
						</div>

						<ul className="carousel-tabs">
							<li className="left-tab" id="animation1">Buy and sell cryptocurrency</li>
							<li id="animation2">Vault Protection</li>
							<li className="right-tab" id="animation3">The most trusted cryptocurrency platform</li>
						</ul>
					</div>
				</div>
				<div className="gradient-homepage"></div>
				<div className="description-homepage">Coinbase is the easiest place to buy, sell, and manage, your cryptocurrency portfolio</div>

				{/* <CurrencyTable/> */}

				{/* <div id="table">
					<CurrencyTable>
						<CurrencyTableItemContainer name="Bitcoin" symbol="BTC" price="11,779.80" change="+7.69%"/>		
						<CurrencyTableItemContainer name="Ethereum" symbol="ETH" price="232.65" change="+5.08%"/>
						<CurrencyTableItemContainer name="XRapid" symbol="XRP" price="0.32" change="+.91%"/>
						<CurrencyTableItemContainer name="Litecoin" symbol="LTC" price="98.39" change="+5.96%"/>
					</CurrencyTable>
				</div> */}

				<div id="table">
					<CurrencyTable currencies={CURRENCIES}/>
				</div>
				
			</>
		)
	}		// these CurrencyTableItemContainer components are passed to the grid component as props.children
}

export default HomePage;