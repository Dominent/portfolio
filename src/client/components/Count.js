import React, { Component } from 'react';
import CountUp from 'react-countup';

class Count extends Component {
    render() {
        return <div className="count__container">
            <h1 className="count__header">You are in good hands</h1>
            <div className="count__section__container">
                <div className="count__section">
                    <CountUp end={4} duration={2} className="count__number count__number--pink"/>
                    <div className="count__info">years <br /> of history</div>
                </div>
                <div className="count__section">
                    <CountUp end={23} duration={2} className="count__number count__number--orange"/>
                    <div className="count__info">projects <br /> completed</div>
                </div>
                <div className="count__section">
                    <CountUp end={23 * 60 * 24} duration={2} className="count__number count__number--green"/>
                    <div className="count__info">development hours <br /> experience</div>
                </div>
            </div>
        </div>
    }
}

export default Count;