import React from 'react';
import PropTypes from 'prop-types';

import { BookType } from '../types';
import { Book } from './index';

const BookList = ({ books, renderBook }) => (
  <div className="bookshelf-books">
    <ol className="books-grid">{books.map(b => <li key={b.title}>{renderBook(b)}</li>)}</ol>
  </div>
);

BookList.propTypes = {
  books: PropTypes.arrayOf(BookType).isRequired,
  renderBook: PropTypes.func,
};

const defaultRenderBook = b => <Book key={b.title} coverImageUrl={b.imageLinks.thumbnail} {...b} />;
BookList.defaultProps = {
  renderBook: defaultRenderBook,
};

const EmptyShelf = () => <p className="bookshelf bookshelf-empty">Shelf is empty</p>;
const Shelf = ({ tag, books, renderBook }) => (
  <div className="book-shelf">
    <h2 className="bookshelf-title">{tag}</h2>
    {books && books.length > 0 ? (
      <BookList books={books} renderBook={renderBook} />
    ) : (
      <EmptyShelf />
    )}
  </div>
);

Shelf.propTypes = {
  tag: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(BookType),
  renderBook: PropTypes.func,
};

Shelf.defaultProps = {
  books: [],
  renderBook: defaultRenderBook,
};

export default Shelf;
