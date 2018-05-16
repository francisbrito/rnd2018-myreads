import React from 'react';
import PropTypes from 'prop-types';

import { Book } from '.';
import { BookType } from '../types';

const BookList = ({ books, renderBook }) => (
  <ol className="books-grid">{books.map(b => <li key={b.id}>{renderBook(b)}</li>)}</ol>
);

BookList.propTypes = {
  books: PropTypes.arrayOf(BookType).isRequired,
  renderBook: PropTypes.func,
};

const defaultRenderBook = b => <Book coverImageUrl={b.imageLinks.thumbnail} {...b} />;
BookList.defaultProps = {
  renderBook: defaultRenderBook,
};
BookList.defaultRenderBook = defaultRenderBook;

export default BookList;
