import React from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Gallery from './components/gallery/Gallery';
import Contacts from './components/contacts/Contacts';

export default (
    <React.Fragment>
        <Navbar />
        <Landing />
        <Gallery />
        <Contacts />
        <Footer />
    </React.Fragment>
)