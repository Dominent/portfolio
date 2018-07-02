import React, { Component } from 'react'
import GalleryItem from './GalleryItem';
import GalleryDetails from './GalleryDetails';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import items from './_data';
import { setGalleryDetails } from '../../actions/galleryActions';
import Wrapper from './Wrapper';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDetails: false,
            details: {}
        }

        this.onGalleryDetailsClicked = this.onGalleryDetailsClicked.bind(this);
    }

    onGalleryItemClicked(e, details) {
        this.setState({
            // displayDetails: true,
            details
        }, () => {
            this.props.setGalleryDetails(details);
            this.props.history.push('/gallery');
        });
    }

    onGalleryDetailsClicked(e) {
        this.setState({
            // displayDetails: false,
            details: {}
        });
    }

    render() {
        const details = (
            <Motion defaultStyle={{
                x: 100,
                opacity: 0
            }} style={{
                x: spring(this.state.displayDetails ? 0 : 100),
                opacity: spring(this.state.displayDetails ? 1 : 0)
            }}>
                {(style) => (
                    <GalleryDetails
                        display={this.state.displayDetails}
                        style={{
                            opacity: style.opacity,
                            left: `${style.x}%`,
                            backgroundColor: '#fff'
                        }}
                        onClickHandler={this.onGalleryDetailsClicked}
                        header={this.state.details.header}
                        info={this.state.details.info}
                        description={this.state.details.description}
                        images={this.state.details.images}
                        tags={this.state.details.tags}
                    />
                )}
            </Motion>
        )

        return (
            <div className="gallery" style={{ backgroundColor: '#1abc9c' }}>
                {/* {false ? details : null} */}
                <div className="jumbotron" style={{ color: '#fff' }}>
                    <div className="container text-center">
                        <header>
                            <h1 className="display-4">My Portfolio</h1>
                            <p>A Selection of My Work</p>
                            <hr />
                        </header>
                        <main>
                            <div className="row mt-4">
                                {items.map((x, index) => (
                                    <div className="col-md-3">
                                        <GalleryItem key={index}
                                            header={x.header}
                                            imgSrc={x.imgSrc}
                                            description={x.description}
                                            onClickHandler={(ev) => this.onGalleryItemClicked(ev, x.details)} />
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            </div>)
    }
}

export default connect(null, {
    setGalleryDetails
})(withRouter(Gallery));
