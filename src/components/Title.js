import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children }) => (
  <div className="list-books-title">
    <h1>{children}</h1>
  </div>
);

Title.propTypes = {
  children: PropTypes.node,
};

Title.defaultProps = {
  children: 'My Reads',
};

export default Title;
