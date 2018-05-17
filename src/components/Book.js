import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intersperse } from 'ramda';

class Book extends Component {
  static propTypes = {
    renderShelfChanger: PropTypes.func,
    title: PropTypes.string.isRequired,
    coverImageUrl: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    renderShelfChanger: () => null,
    authors: [],
  };

  onMoveTo = () => {};

  render() {
    const {
      title, coverImageUrl, authors, renderShelfChanger,
    } = this.props;
    // NOTE: similar to `Array#join` but returns an array instead.
    const authorsText = intersperse(<br />, authors);

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ background: `url("${coverImageUrl}") center`, backgroundSize: 'cover' }}
          />
          {renderShelfChanger()}
        </div>
        <p className="book-title">{title}</p>
        <p className="book-authors">{authorsText}</p>
      </div>
    );
  }
}

export default Book;
