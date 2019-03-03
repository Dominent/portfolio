import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Gallery from './components/gallery/Gallery';
import Contacts from './components/contacts/Contacts';
import Footer from './components/layout/Footer';
import { connect } from 'react-redux';
import { getProjects } from '@store/actions/projectActions';
import Count from './components/Count';

class Spa extends Component {
    componentDidMount() {
        this.props.getProjects();
    }

    render() {
        return (<React.Fragment>
            <Navbar />
            <div id="id_landing">
                <Landing />
            </div>
            <div id="id_count">
                <Count />
            </div>
            <div id="id_projects">
                <Gallery />
            </div>
            <div id="id_contacts">
                <Contacts />
            </div>
            <Footer />
        </React.Fragment>)
    }
}

const mapDispatchToProps = (dispatch) => ({
    getProjects: () => getProjects(dispatch)
})
export default connect(null, mapDispatchToProps)(Spa)