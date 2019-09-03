import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setGalleryDetails } from '@client/store/actions/galleryActions';
import axios from 'axios';

import ResponsiveGallery from './ResponsiveGallery';

class Gallery extends Component {
    onGalleryItemClicked(src) {
        let project = this.props.projects.projects
            .find((p) => p.image.path === src);

        let projectDetails = axios
            .get(`${process.env.API_URL}/projects/${project.id}/details`)
            .then(res => {
                let projectDetails = res.data;

                let details = project ? {
                    description: projectDetails.description,
                    header: project.title,
                    images: projectDetails.images.map(i => ({
                        src: i.path,
                        alt: i.alt
                    })),
                    info: projectDetails.info,
                    tags: projectDetails.tags.map(t => t.name),
                    links: projectDetails.links
                } : null;
        
                this.props.setGalleryDetails(details);
                this.props.history.push('/gallery');
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let images = this.props.projects.projects.map(x => ({
            src: x.image.path,
            header: x.title,
            description: x.summary
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
