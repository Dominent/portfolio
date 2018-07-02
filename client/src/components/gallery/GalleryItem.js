import React, { Component } from 'react'
import Overlay from '../common/Overlay';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

class GalleryItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseEntered: false,
            showDetails: false
        }

        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onMouseEnterHandler(e) {
        this.setState({ mouseEntered: true });
    }

    onMouseLeaveHandler(e) {
        this.setState({ mouseEntered: false });
    }

    onClickHandler(e) {
        this.setState({ showDetails: true });

        if (this.props.onClickHandler) {
            this.props.onClickHandler(e);
        }
    }

    render() {
        return (
            <div className="card"
                onMouseEnter={this.onMouseEnterHandler}
                onMouseLeave={this.onMouseLeaveHandler}>

                {this.state.mouseEntered ? (
                    <Motion defaultStyle={{
                        opacity: 0,
                        x: 0
                    }} style={{
                        opacity: spring(0.5),
                        x: spring(50)
                    }}>
                        {(style) => (
                            <div>
                                <div style={{
                                    background: 'none',
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    top: '80%',
                                    transform: `translateY(${-style.x}px)`
                                }}>
                                    <h3> {this.props.header} </h3>
                                    <span> {this.props.description}</span>
                                </div>

                                <Overlay style={{ opacity: style.opacity }}
                                    onClick={this.onClickHandler} />
                            </div>
                        )}
                    </Motion>) : null}

                <img src={this.props.imgSrc} alt="" className="card-img-top" />
            </div>
        )
    }
}

GalleryItem.propTypes = {
    onClickHandler: PropTypes.func
}


export default GalleryItem;
