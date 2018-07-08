import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { setGalleryDetails } from '../../actions/galleryActions';

import data from './_data';
import ResponsiveGallery from './ResponsiveGallery';

class Gallery extends Component {
    onGalleryItemClicked(src) {
        let srcToDetails = {};

        data.forEach(x => srcToDetails[x.src] = x.details)

        let details = srcToDetails[src];

        this.props.setGalleryDetails(details);
        this.props.history.push('/gallery');
    }

    render() {
        let images = [...data].map(x => x.src);
        return (
            <div className="gallery" style={{ backgroundColor: '#1abc9c' }}>
                <div className="jumbotron" style={{ color: '#fff' }}>
                    <div className="container text-center">
                        <header>
                            <h1 className="display-4">My Portfolio</h1>
                            <p>A Selection of My Work</p>
                            <hr style={{ borderTop: '1px solid #fff' }} />
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

export default connect(null, {
    setGalleryDetails
})(withRouter(Gallery));
