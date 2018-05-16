import React from 'react';
import PropTypes from 'prop-types';

import { BookType } from '../types';
import { BookList } from '.';

const EmptyShelf = () => <p className="bookshelf bookshelf-empty">Shelf is empty</p>;
const Shelf = ({ tag, books, renderBook }) => (
  <div className="book-shelf">
    <h2 className="bookshelf-title">{tag}</h2>
    {books && books.length > 0 ? (
      <div className="bookshelf-books">
        <BookList books={books} renderBook={renderBook} />
      </div>
    ) : (
      <EmptyShelf />
    )}
  </div>
);

Shelf.propTypes = {
  tag: PropTypes.string,
  books: PropTypes.arrayOf(BookType),
  renderBook: PropTypes.func,
};

Shelf.defaultProps = {
  tag: 'None',
  books: [],
  renderBook: BookList.defaultRenderBook,
};

export default Shelf;
