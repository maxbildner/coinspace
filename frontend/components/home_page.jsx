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
        let slideCount = slides.length;
        slides.first().addClass('active');
        let rotateSlide = () => {
            let activeSlide = slides.filter('.active');
            let activeSlideIdx = slides.index(activeSlide);
            let newSlideIdx = (activeSlideIdx + 1) % slideCount;
            let newSlide = $(slides.get(newSlideIdx));
            if (activeSlideIdx >= 0) activeSlide.removeClass('active');
            newSlide.addClass('active');
        };
        this.interval = window.setInterval(rotateSlide, 5000);

    }

    componentWillUnmount() {
        if (this.interval) window.clearInterval(this.interval);
    }


    render() {
        return (
            <>
                <div className="carousel" ref={this.carousel}> 
                    <div className="slide"><img src="/assets/new_york.jpeg"/></div>
                    <div className="slide"><img src="/assets/rocket.jpeg" /></div>
                    <div className="slide"><img src="/assets/space.jpeg" /></div>
                </div>
            </>
        )
    }

}

export default HomePage;