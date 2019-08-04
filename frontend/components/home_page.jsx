import React from 'react';

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.carousel = React.createRef();
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
		this.interval = window.setInterval(rotateSlide, 5000);
	}


	componentWillUnmount() {
		if (this.interval) window.clearInterval(this.interval);
	}


	render() {
		return (
			<>
				<div className="carousel" ref={this.carousel}> 
					<div className="slide"><img src="/assets/space.jpeg" className="background-img" alt="outer space"/></div>
					<div className="slide"><img src="/assets/new_york.jpeg" className="background-img" alt="new york"/></div>
					<div className="slide"><img src="/assets/vault.png" className="background-img" alt="bank vault"/></div>

					<div className="carousel-bottom">
						<div className="carousel-description">
							<div className="carousel-slide-label"></div>
							<div className="carousel-bottom-action">
								<button>Sign Up</button>
							</div>
						</div>

						<ul className="carousel-tabs">
							<li>Buy and sell cryptocurrency</li>
							<li>Vault Protection</li>
							<li>The most trusted cryptocurrency platform</li>
						</ul>
					</div>
				</div>
				<CurrencyTable>
					<CurrencyTableItem symbol="BTC"/>
				</CurrencyTable>
			</>
		)
	}
}

export default HomePage;