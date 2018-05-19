import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { values } from 'ramda';

import './App.css';

import { MainView, SearchView, LoadingBar } from './components';

import * as BooksApi from './BooksApi';

const fromListToHash = ({ items, getKey }) =>
  items.reduce((hash, item) => ({ ...hash, [getKey(item)]: item }), {});

class App extends Component {
  state = {
    books: {},
  };

  componentDidMount = () => {
    BooksApi.getAll()
      .then(books => fromListToHash({ items: books, getKey: b => b.id }))
      .then(books => this.setState({ books }));
  };

  onBookMoved = ({ book, newShelf }) => {
    const originalState = this.state;

    this.updateBookState({ book, newShelf });

    // NOTE: if update fails, return app to its previous state.
    BooksApi.update(book, newShelf).catch(() => this.setState(() => originalState));
  };

  updateBookState = ({ book, newShelf }) => {
    this.setState(prev => ({
      ...prev,
      books: { ...prev.books, [book.id]: { ...book, shelf: newShelf } },
    }));
  };

  render() {
    const books = values(this.state.books);

    return (
      <BrowserRouter>
        <div className="app">
          <LoadingBar />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            render={() => <MainView books={books} onBookMoved={this.onBookMoved} />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/search`}
            render={() => (
              <SearchView shelvedBooks={this.state.books} onBookMoved={this.onBookMoved} />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
