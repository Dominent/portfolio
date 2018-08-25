import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Media extends Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {},
            mode: 'Desktop'
        }
    }

    updateDimensions() {
        const { width, height } = this.getDimensions();

        const MAX_PHONE_WIDTH = 600;
        const MAX_TABLET_WIDTH = 900;
        const MAX_LAPTOP_WIDTH = 1200;

        if (width <= MAX_PHONE_WIDTH) {
            this.setState({ style: this.props.onPhoneResize( { width, height }, this.state.style), mode: 'Phone' })
        } else if (width <= MAX_TABLET_WIDTH) {
            this.setState({ style: this.props.onTabletResize( { width, height }, this.state.style), mode: 'Tablet' });
        } else if (width <= MAX_LAPTOP_WIDTH) {
            this.setState({ style: this.props.onLaptopResize( { width, height }, this.state.style), mode: 'Laptop' });
        } else {
            this.setState({ style: this.props.onDesktopResize( { width, height }, this.state.style), mode: 'Desktop' });
        }

        this.props.onResize(width, height);
    }

    getDimensions() {
        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        return { width, height };
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        return (<React.Fragment>
            {this.props.children(this.state.style, this.state.mode)}
        </React.Fragment>)
    }
}

Media.propTypes = {
    children: PropTypes.func.isRequired,
    onPhoneResize: PropTypes.func,
    onTabletResize: PropTypes.func,
    onLaptopResize: PropTypes.func,
    onDesktopResize: PropTypes.func,
    onResize: PropTypes.func
}

Media.defaultProps = {
    onPhoneResize: (x) => x,
    onTabletResize: (x) => x,
    onLaptopResize: (x) => x,
    onDesktopResize: (x) => x,
    onResize: (x) => x
}

export default Media;