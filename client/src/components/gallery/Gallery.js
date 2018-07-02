import React, { Component } from 'react'
import GalleryItem from './GalleryItem';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { setGalleryDetails } from '../../actions/galleryActions';

import items from './_data';

class Gallery extends Component {
    onGalleryItemClicked(details) {
        this.props.setGalleryDetails(details);
        this.props.history.push('/gallery');
    }

    render() {
        return (
            <div className="gallery" style={{ backgroundColor: '#1abc9c' }}>
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
                                            onClickHandler={(ev) => this.onGalleryItemClicked(x.details)} />
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
