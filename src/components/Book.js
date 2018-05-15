import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const authorsText = authors.join(<br />);

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
