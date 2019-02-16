import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setGalleryDetails } from '@client/store/actions/galleryActions';

import ResponsiveGallery from './ResponsiveGallery';

import projects from '../../data/projects';

class Gallery extends Component {
    onGalleryItemClicked(src) {
        let srcToDetails = {};

        projects.forEach(x => srcToDetails[x.src] = x.details)

        let details = srcToDetails[src];

        this.props.setGalleryDetails(details);
        this.props.history.push('/gallery');
    }

    render() {
        let images = [...projects].map(x => ({
            src: x.src,
            header: x.header,
            description: x.description
        }));

        return (
            <div className="gallery"
                style={{ background: 'linear-gradient(to right, #1abc9c, #007bff)' }}
            >
                <div className="jumbotron" style={{ color: '#fff' }}>
                    <div className="container text-center">
                        <header>
                            <h1 className="display-4">My Portfolio</h1>
                            <h4>A Selection of My Work</h4>
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
