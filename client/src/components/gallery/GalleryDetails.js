import React, { Component } from 'react';
import Scrollable from '../common/Scrollable';
import PropTypes from 'prop-types';
import BarrelGallery from './BarrelGallery';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import Redirect from 'react-router-dom/Redirect';
import Carousel from 'nuka-carousel';

class GalleryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
        };
    }

    render() {
        const { header, info, description, tags, images } = this.props.details;

        const meta = (
            <React.Fragment >
                <div className="row" >
                    <div className="col-md-10 offset-md-1">
                        <h1>{header}</h1>
                        <div className="text-muted">{info}</div>
                        <hr></hr>
                        <div>{description}</div>
                        <hr></hr>
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
                <div className="row">
                    <i
                        className="fas fa-angle-double-left pl-2 pr-2 ml-3"
                        style={style.arrow}
                        onClick={() => this.props.history.push('/')}
                    ></i>
                </div>
            </React.Fragment>
        )

        return (
            <React.Fragment>
                {isEmpty(this.props.details) ? <Redirect to="/" /> : null}

                <div
                    className="gallery-details"
                    style={{ ...style.main, ...this.props.style }}
                >

                    <div className="row">
                        <div className="col-md-6">
                            <Scrollable>
                                {meta}
                            </Scrollable>
                        </div>
                        <div className="col-md-6">
                            {(images && images.length) ? (<img style={{
                                boxShadow: '-10px 0px 10px 1px #aaaaaa',
                                transform: `scale(${style.scale})`
                            }} src={images[this.state.selected].src}
                            ></img>) : null}
                        </div>
                    </div>

                </div>
            </React.Fragment>

        )
    }
}

const style = {};

style.main = {
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: 1000,
    backgroundColor: '#fff',
    overflowX: 'hidden'
};

style.arrow = {
    fontSize: '4rem',
    border: '1px solid #d9d9d9',
    borderRadius: '5px',
    backgroundColor: 'rgb(26, 188, 156)',
    color: '#fff',
    marginTop: '5%'
}

GalleryDetails.propTypes = {
    onClickHandler: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        details: state.gallery.details
    }
}

export default connect(mapStateToProps, null)(withRouter(GalleryDetails));
