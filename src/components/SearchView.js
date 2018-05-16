import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'debounce';
import PropTypes from 'prop-types';

import { BookList, Book, ShelfChanger } from '.';
import * as BooksApi from '../BooksApi';
import { BookType, ShelfType } from '../types';

const consolidateWith = xs => (x) => {
  const itemIdx = xs.findIndex(xx => x.id === xx.id);

  if (itemIdx !== -1) {
    const result = { ...x, ...xs[itemIdx] };

    return result;
  }

  return x;
};

class SearchView extends Component {
  static propTypes = {
    shelvedBooks: PropTypes.arrayOf(BookType),
    shelves: PropTypes.arrayOf(ShelfType),
    onBookMoved: PropTypes.func,
  };

  static defaultProps = {
    shelves: [
      { tag: 'Currently reading', value: 'currentlyReading' },
      { tag: 'Want to read', value: 'wantToRead' },
      { tag: 'Read', value: 'read' },
      { tag: 'None', value: 'none' },
    ],
    shelvedBooks: [],
    onBookMoved: () => {},
  };

  state = {
    books: [],
    query: '',
  };

  onChangeQuery = (e) => {
    this.setState({ books: [], query: e.target.value });
    this.searchBooks();
  };

  // NOTE: debouncing to avoid sending too many requests to search API.
  searchBooks = debounce(() => {
    BooksApi.search(this.state.query)
      .then(response => (Array.isArray(response) ? response : []))
      .then(books => this.setState(prev => ({ ...prev, books })));
  }, 150);

  render() {
    const { books } = this.state;
    const { shelves, onBookMoved, shelvedBooks } = this.props;
    const consolidatedBooks = books.map(consolidateWith(shelvedBooks));

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" href="/" to="/">
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
            books={consolidatedBooks}
            renderBook={b => (
              <Book
                key={b.id}
                coverImageUrl={b.imageLinks.thumbnail}
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
