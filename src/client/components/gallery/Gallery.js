import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setGalleryDetails } from '@client/store/actions/galleryActions';

import ResponsiveGallery from './ResponsiveGallery';

class Gallery extends Component {
    onGalleryItemClicked(src) {
        let srcToDetails = {};

        let details = srcToDetails[src];

        this.props.setGalleryDetails(details);
        this.props.history.push('/gallery');
    }

    render() {
        let images = [];

        return (
            <div className="gallery">
                <div className="jumbotron">
                    <div className="container text-center">
                        <header>
                            <h1 className="display-4">My Portfolio</h1>
                            <h4>A Selection of My Work</h4>
                            <hr className="jumbotron-header" />
                        </header>
                    </div>
                    <main>
                        <ResponsiveGallery
                            images={images}
                            onClick={(src) => this.onGalleryItemClicked(src)}
                            columns={4}
                        />
                    </main>
                </div>
            </div >)
    }
}

export default connect(null, { setGalleryDetails })(withRouter(Gallery));
