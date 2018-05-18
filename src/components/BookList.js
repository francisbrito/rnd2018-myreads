import React from 'react';
import PropTypes from 'prop-types';

import { Book } from '.';

const BookList = ({ books, renderBook }) => (
  <ol className="books-grid">{books.map(b => <li key={b.id}>{renderBook(b)}</li>)}</ol>
);

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape(Book.propTypes)).isRequired,
  renderBook: PropTypes.func,
};

BookList.defaultProps = {
  renderBook: b => <Book {...b} />,
};

export default BookList;
