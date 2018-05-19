import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'debounce';
import PropTypes from 'prop-types';
import { values } from 'ramda';

import { BookList, Book, ShelfChanger, Shelf } from '.';
import * as BooksApi from '../BooksApi';

const fromListToHash = ({ items, getKey }) =>
  items.reduce((hash, item) => ({ ...hash, [getKey(item)]: item }), {});

class SearchView extends Component {
  static propTypes = {
    shelves: PropTypes.arrayOf(PropTypes.shape(Shelf.propTypes)),
    onBookMoved: PropTypes.func,
  };

  static defaultProps = {
    shelves: [
      { tag: 'Currently reading', value: 'currentlyReading' },
      { tag: 'Want to read', value: 'wantToRead' },
      { tag: 'Read', value: 'read' },
      { tag: 'None', value: 'none' },
    ],
    onBookMoved: () => {},
  };

  state = {
    books: {},
    query: '',
  };

  onChangeQuery = (e) => {
    this.setState({ books: [], query: e.target.value });
    this.searchBooks();
  };

  // NOTE: debouncing to avoid sending too many requests to search API.
  searchBooks = debounce(() => {
    if (this.state.query && this.state.query.length > 0) {
      BooksApi.search(this.state.query)
        .then(response => (Array.isArray(response) ? response : []))
        .then(books => fromListToHash({ items: books, getKey: b => b.id }))
        .then(books => this.setState(prev => ({ ...prev, books })));
    }
  }, 150);

  render() {
    const books = values(this.state.books);
    const { shelves, onBookMoved } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            href={`${process.env.PUBLIC_URL}/`}
            to={`${process.env.PUBLIC_URL}/`}
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onChangeQuery}
            />
          </div>
        </div>
        <div className="search-book-results">
          <BookList
            books={books}
            renderBook={b => (
              <Book
                key={b.id}
                renderShelfChanger={() => (
                  <ShelfChanger
                    shelves={shelves}
                    currentShelf={b.shelf || 'none'}
                    onMoveTo={shelf => onBookMoved({ book: b, newShelf: shelf })}
                  />
                )}
                {...b}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default SearchView;
