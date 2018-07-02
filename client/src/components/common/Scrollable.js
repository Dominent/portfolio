import React, { Component } from 'react'
import ReactDOM from 'react-dom';

class Scrollable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 0
        };

        this.onScrollHandler = this.onScrollHandler.bind(this);
    }

    componentDidMount() {
        let node = ReactDOM.findDOMNode(this);
        node
            .parentElement
            .addEventListener('scroll', (ev) => console.log(ev), false);
    }

    // componentDidMount() {
    //     let DOMNode = document.querySelector('.App');

    //     if (!DOMNode) { return }
    //     DOMNode.addEventListener('scroll', this.onScrollHandler);
    // }

    // componentWillUnmount() {
    //     // const body = document.getElementsByTagName('body')[0];

    //     // body.removeEventListener('scroll', this.onScrollHandler);
    // }

    onScrollHandler(e) {
        this.setState({ top: e.currentTarget.scrollTop })
    }

    render() {
        return (
            <div
                className="scrollable"
                style={{
                    position: 'relative',
                    transform: `translateY(${this.state.top}px)`
                }}
            >
                {this.props.children}
            </div>
        )
    }
}

export default Scrollable;
