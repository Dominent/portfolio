import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setGalleryDetails } from '@client/store/actions/galleryActions';

import ResponsiveGallery from './ResponsiveGallery';

class Gallery extends Component {
    onGalleryItemClicked(src) {
        let project = this.props.projects.projects
            .find((p) => p.ImageSrc === src);

        let details = project ? {
            description: project.ProjectDetailsDescription,
            header: project.ProjectDetailsHeader,
            images: project.images.map(i => ({
                src: i.Src,
                alt: i.Alt
            })),
            info: project.ProjectDetailsInfo,
            tags: project.tags.map(t => t.Name),
            links: []
        } : null;

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
