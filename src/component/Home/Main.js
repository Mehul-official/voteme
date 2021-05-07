import React from 'react';
import Slider from './Slider';
import Features from './Features';
import Steps from './Steps';
import AboutUs from './AboutUs';
import JoinUs from './JoinUs';
import GetInTouch from './GetInTouch';

export default class Home extends React.Component {
    render() {
        return(
            <div>
                <Slider />
                <Features />
                <Steps />
                <AboutUs />
                <JoinUs />
                <GetInTouch />               
            </div>
        );
    }
}
