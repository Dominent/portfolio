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
        let images = this.props.projects.projects.map(x => ({
            src: x.ImageSrc,
            header: x.Header,
            description: x.Description
        }));

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

const mapStateToProps = (state) => ({
    projects: state.projects,
})
export default connect(mapStateToProps, { setGalleryDetails })(withRouter(Gallery));
