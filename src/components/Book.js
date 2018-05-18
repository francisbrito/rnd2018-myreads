import React from 'react';
import { intersperse, map } from 'ramda';
import PropTypes from 'prop-types';
import uniqueString from 'unique-string';

const BookCover = ({ thumbnail }) => {
  const bookCoverStyle = {
    background: `url("${thumbnail}") center`,
    backgroundSize: 'cover',
  };
  return <div className="book-cover" style={bookCoverStyle} />;
};

BookCover.propTypes = {
  thumbnail: PropTypes.string.isRequired,
};

const BookCoverNotAvailable = () => {
  const bookCoverNotAvailableStyle = {
    color: '#666',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1rem',
  };

  return (
    <div className="book-cover" style={bookCoverNotAvailableStyle}>
      Cover not available
    </div>
  );
};

const Book = ({
  id, title, authors, imageLinks, renderShelfChanger,
}) => {
  const thumbnail = imageLinks && imageLinks.thumbnail;
  const renderBookCover = withThumbnail =>
    (withThumbnail ? <BookCover thumbnail={withThumbnail} /> : <BookCoverNotAvailable />);
  return (
    <div id={id} className="book">
      <div className="book-top">
        {renderBookCover(thumbnail)}
        {renderShelfChanger()}
      </div>
      <p className="book-title">{title}</p>
      <p className="book-authors">
        {/* NOTE: sets unique keys to `br` elements */}
        {map(e => (e.call ? e(uniqueString()) : e), intersperse(key => <br key={key} />, authors))}
      </p>
    </div>
  );
};

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  imageLinks: PropTypes.shape({
    thumbnail: PropTypes.string,
  }),
  renderShelfChanger: PropTypes.func,
};

Book.defaultProps = {
  authors: [],
  imageLinks: null,
  renderShelfChanger: () => null,
};

export default Book;
