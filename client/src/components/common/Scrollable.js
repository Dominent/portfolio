import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Motion, spring } from 'react-motion';

class Scrollable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 0,
            current: 0
        };

        this.handleScrollEvent = this.handleScrollEvent.bind(this);
    }

    handleScrollEvent(event) {
        const DOMNode = ReactDOM.findDOMNode(this);

        const { scrollTop } = event.target.scrollingElement;

        this.setState({ current: DOMNode.scrollTop });

        this.setState({ top: scrollTop });
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handleScrollEvent, false);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScrollEvent, false);
    }

    render() {
        return (
            <Motion
                defaultStyle={{
                    y: this.state.current
                }}
                style={{
                    y: spring(this.state.top)
                }}
            >
                {
                    (style) => (<div
                        className="scrollable"
                        style={{
                            transform: `translateY(${style.y}px)`
                        }}
                    >
                        {this.props.children}
                    </div>)
                }
            </Motion>
        )
    }
}

export default Scrollable;
