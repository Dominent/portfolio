import React, { Component } from 'react';
import Scrollable from '../common/Scrollable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import Redirect from 'react-router-dom/Redirect';
import { Motion, spring } from 'react-motion';
import Media from '../common/Media';

class GalleryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            close: false
        };
    }

    onClick() {
        this.setState({ close: true });

        this.props.history.push('/');
    }

    render() {
        const { header, info, description, tags, images, links } = this.props.details;


        const meta = (_style) => (
            <React.Fragment >
                <div className="row">
                    <div className="col-md-10 offset-md-1" style={_style}>
                        <h1>{header}</h1>
                        <div className="text-muted">{info}</div>
                        <hr></hr>
                        <div>{description}</div>
                        <hr></hr>
                        {links ? (
                            <React.Fragment>
                                <ul>
                                    {links.map(l => (
                                        <li key={l.name}>
                                            <a href={l.href}>{l.name}</a>
                                        </li>
                                    ))}
                                </ul>
                                <hr></hr>
                            </React.Fragment>)
                            : null}
                        <div>
                            <h4>Technologies Used:</h4>
                            {tags && tags
                                .map((x, index) => (
                                    <span
                                        key={index}
                                        className="badge badge-primary mr-2"
                                    >{x}</span>
                                ))}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )

        return (

            <Media
            >
                {(_style, _mode) =>
                    <React.Fragment>
                        {isEmpty(this.props.details) ? <Redirect to="/" /> : null}

                        <div
                            className="gallery-details"
                            style={{ ...style.main, ...this.props.style }}
                        >
                            <div className="row" >
                                {animations.fadeIn((style) => (
                                    <div className="col-md-6"
                                        onClick={this.onClick.bind(this)}
                                        style={{ opacity: style.opacity }}
                                    >
                                        {_mode !== 'Phone' && _mode !== 'Tablet' ? <Scrollable>
                                            {meta({ marginTop: '25%' })}
                                        </Scrollable> : meta({ margin: '10%' })}
                                    </div>
                                ))}

                                {animations.swipeLeft((style) => (
                                    <div className="col-md-6"
                                        style={{
                                            transform: `translateX(${style.x}px)`
                                        }}>
                                        {(images && images.length) ? (<img style={{
                                            boxShadow: '-10px 0px 10px 1px #aaaaaa',
                                        }} src={images[this.state.selected].src}
                                            alt="Gallery Details"
                                        ></img>) : null}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </React.Fragment>
                }
            </Media>
        )
    }
}

const style = {
    main: {
        width: '100%',
        height: '100%',
        zIndex: 1000,
        backgroundColor: '#fff',
        overflowX: 'hidden'
    },
    arrow: {
        fontSize: '4rem',
        border: '1px solid #d9d9d9',
        borderRadius: '5px',
        backgroundColor: 'rgb(26, 188, 156)',
        color: '#fff',
        marginTop: '5%'
    }
};

const animations = {
    fadeIn: (func) => (
        <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
            {func}
        </Motion>
    ),
    swipeLeft: (func) => (
        <Motion defaultStyle={{ x: 100 }} style={{ x: spring(0) }}>
            {func}
        </Motion>
    )
};

GalleryDetails.propTypes = {
    onClickHandler: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        details: state.gallery.details
    }
}

export default connect(mapStateToProps, null)(withRouter(GalleryDetails));
