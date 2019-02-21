import React from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Gallery from './components/gallery/Gallery';
import Contacts from './components/contacts/Contacts';
import Footer from './components/layout/Footer';

export default () => (
    <React.Fragment>
        <Navbar />
        <div id="id_landing">
            <Landing />
        </div>
        <div id="id_projects">
            <Gallery />
        </div>
        <div id="id_contacts">
            <Contacts />
        </div>
        <Footer />
    </React.Fragment>
)
