import React from 'react';

export default class Slider extends React.Component {
    render() {
        return(
            <section id="home-banner" className="home-hero-sec">
                <div className="banner-image" style={{backgroundImage:"url('"+process.env.REACT_APP_BASE_URL+"src/assets/images/hero-background.jpg')"}}>
                    <div className="container">
                        <div className="slider-text">
                            <h1 className="big-title">Vote For Best<br /> and accurate...<br /> ask your <span className="orange-text">Queries</span></h1>
                            <div className="slider-small-text">Solve your any type of queries by asking and also help others by voting their queries</div>
                            <div className="slider-btn"><a href="/#">VOTE FOR BEST <span className="tick-icon"><img src={process.env.REACT_APP_BASE_URL+"src/assets/images/tick.svg"} /></span></a></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
