import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../footer/Footer';
import Navigation from '../header/Navigation';

const Layout: React.SFC = ({ children }) => (
  <div className="flex flex-col justify-between pt-16 min-h-screen">
    <Navigation />
    {children}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
