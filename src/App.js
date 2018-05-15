import React, { Component } from 'react';

import './App.css';

import * as BooksApi from './BooksApi';

import { Title, Shelf, Book, ShelfChanger } from './components';

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

class App extends Component {
  state = {
    books: [],
  };

  componentWillMount = () => {
    BooksApi.getAll().then(books => this.setState(() => ({ books })));
  };

  onMovedShelf = ({ book, newShelf }) => {
    const { books } = this.state;
    const bookIdx = books.findIndex(b => b.title === book.title);

    // DANGEROUS?
    books[bookIdx] = Object.assign({ ...book }, { shelf: newShelf });

    this.setState(() => ({ books }));
  };

  render() {
    const { books } = this.state;
    const shelves = buildShelvesFromBooks(books);

    return (
      <div className="App">
        <Title>MyReads</Title>
        <div className="list-books-content">
          {shelves.map(s => (
            <Shelf
              key={s.value}
              {...s}
              renderBook={b => (
                <Book
                  key={`${s.value}-${b.title}`}
                  coverImageUrl={b.imageLinks.thumbnail}
                  renderShelfChanger={() => (
                    <ShelfChanger
                      shelves={shelves}
                      currentShelf={b.shelf}
                      onMoveTo={newShelf => this.onMovedShelf({ book: b, newShelf })}
                    />
                  )}
                  {...b}
                />
              )}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
