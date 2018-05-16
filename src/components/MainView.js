import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Title, Shelf, Book, ShelfChanger } from '.';
import { ShelfType } from '../types';

const buildShelvesFromBooks = (books) => {
  const shelves = [
    { tag: 'Currently reading', value: 'currentlyReading' },
    { tag: 'Want to read', value: 'wantToRead' },
    { tag: 'Read', value: 'read' },
  ];
  const shelvesWithBooks = shelves.map(s => ({
    ...s,
    books: books.filter(b => b.shelf === s.value),
  }));

  return shelvesWithBooks;
};

function MainView({ books, onBookMoved }) {
  const shelvesToBeRendered = buildShelvesFromBooks(books);
  const availableShelves = shelvesToBeRendered.concat([{ tag: 'None', value: 'none' }]);

  return (
    <div className="MainView">
      <Title>MyReads</Title>
      <div className="list-books-content">
        {shelvesToBeRendered.map(s => (
          <Shelf
            key={s.value}
            {...s}
            renderBook={b => (
              <Book
                key={`${s.value}-${b.title}`}
                coverImageUrl={b.imageLinks.thumbnail}
                renderShelfChanger={() => (
                  <ShelfChanger
                    shelves={availableShelves}
                    currentShelf={b.shelf}
                    onMoveTo={newShelf => onBookMoved({ book: b, newShelf })}
                  />
                )}
                {...b}
              />
            )}
          />
        ))}
      </div>
      <div className="open-search">
        <Link href="/search" to="/search" />
      </div>
    </div>
  );
}

MainView.propTypes = {
  books: PropTypes.arrayOf(ShelfType),
  onBookMoved: PropTypes.func,
};

MainView.defaultProps = {
  books: [],
  onBookMoved: () => {},
};

export default MainView;
