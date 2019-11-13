import React from 'react';
import { NavLink } from 'react-router-dom';
import CurrencyTable from './currency_table/currency_table';
import TradeModal from './trading/tradeModalContainer';
import Footer from './footer';

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
		this.triggerModal = this.triggerModal.bind(this);
		this.renderModal = this.renderModal.bind(this);
		this.hideModal = this.hideModal.bind(this);

		// set local state of buy/sell modal form
		this.state = {
			modalOn: false,
			symbolClicked: 'test',
			priceClicked: 'test'
		};
	}
	

	componentDidMount() {
		let carousel = $(this.carousel.current);
		let slides = carousel.find('.slide');
		let tabsContainer = carousel.find('ul.carousel-tabs');
		let labelContainer = carousel.find('.carousel-slide-labels');
		slides.each((idx, el) => {
			let slide = $(el);
			let desc = slide.data('description');
			let label = $('<div/>').text(desc);
			let tab = $('<li/>').text(desc);
			labelContainer.append(label);
			tabsContainer.append(tab);
		});
		let tabs = tabsContainer.children('li');			// array-like of all tabs
		let labels = labelContainer.children('div');
		let slideCount = slides.length;
		let rotateSlide = () => {
			let activeSlide = slides.filter('.active');
			let activeTab = tabs.filter('.active');
			let activeLabel = labels.filter('.active');
			let activeSlideIdx = (activeSlide.length > 0) ? slides.index(activeSlide) : -1;
			let newSlideIdx = (activeSlideIdx + 1) % slideCount;
			let newSlide = $(slides.get(newSlideIdx));
			let newSlideTab = $(tabs.get(newSlideIdx));
			let newSlideLabel = $(labels.get(newSlideIdx));
			[activeSlide, activeTab, activeLabel].forEach(el => { $(el).removeClass('active') });
			[newSlide, newSlideTab, newSlideLabel].forEach(el => { $(el).addClass('active') });
		};
		rotateSlide();
		this.interval = window.setInterval(rotateSlide, 5000);		// 5 seconds 
	}


	componentWillUnmount() {
		if (this.interval) window.clearInterval(this.interval);
	}


	triggerModal(symbol, price) {
		// debugger

		// Toggle local state of modal to true
		this.setState({
			modalOn: true,
			symbolClicked: symbol,
			priceClicked: price
		});
	}


	renderModal() {
		// let symbol = this.state.symbolClicked;
		const { symbolClicked, priceClicked } = this.state;
		// debugger
		

		// If modal toggle true, display modal
		if (this.state.modalOn) {
			return <TradeModal symbol={symbolClicked} toggleModal={this.hideModal} price={priceClicked}/>
		} else {
			return null;
		}
	}

	hideModal() {
		this.setState({
			modalOn: false,
			symbolClicked: 'test'
		});
	}


	render() {
		
		
		let signup;
		// if user signed in, render signup button
		let reduxState = getState();
		if (reduxState.session.id == null) {
			signup = <NavLink to='/signup' className="sign-up-home">Sign Up</NavLink>
		}
		

		return (
			<>
				<div className="carousel" ref={this.carousel}> 
					<div className="slide" id="slide1" data-description="Buy and sell cryptocurrency"><img src="https://www.spacex.com/sites/spacex/files/bfrlunar_v2.jpg" className="background-img" alt="outer space"/></div>
					<div className="slide" id="slide2" data-description="Vault Protection"><img src="https://i.imgur.com/LxGUNGt.png" className="background-img" alt="new york"/></div>
					<div className="slide" id="slide3" data-description="Insurance coverage"><img src="https://i.imgur.com/wLrUncM.jpg" className="background-img" alt="bank vault"/></div>

					<div className="carousel-bottom">
						<div className="carousel-description">
							<div className="carousel-slide-labels">
							</div>
							<div className="carousel-bottom-action">
								{signup}
							</div>
						</div>

						<ul className="carousel-tabs">
						</ul>
					</div>
				</div>
				<div className="gradient-homepage"></div>
				<div className="description-homepage">Coinbase is the easiest place to buy, sell, and manage, your cryptocurrency portfolio</div>

				{this.renderModal()}

				<div id="table">
					<CurrencyTable currencies={CURRENCIES} triggerModal={(symbol, price) => this.triggerModal(symbol, price)}/>
				</div>

				
			</>
		)
	}		// these CurrencyTableItemContainer components are passed to the grid component as props.children
}

export default HomePage;