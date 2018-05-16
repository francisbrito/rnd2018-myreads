import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import { MainView, SearchView } from './components';

import * as BooksApi from './BooksApi';

class App extends Component {
  state = {
    books: [],
  };

  componentWillMount = () => {
    BooksApi.getAll().then(books => this.setState(() => ({ books })));
  };

  onBookMoved = ({ book, newShelf }) => {
    const { books } = this.state;
    const bookIdx = books.findIndex(b => b.id === (book && book.id));

    // DANGEROUS MUTATIONS?
    if (bookIdx === -1) {
      books.push({ ...book, shelf: newShelf });
    } else {
      books[bookIdx] = Object.assign({ ...book }, { shelf: newShelf });
    }

    this.setState(() => ({ books }));
  };

  render() {
    const { books } = this.state;

    return (
      <BrowserRouter>
        <div className="app">
          <Route
            exact
            path="/"
            render={() => <MainView books={books} onBookMoved={this.onBookMoved} />}
          />
          <Route
            path="/search"
            render={() => <SearchView shelvedBooks={books} onBookMoved={this.onBookMoved} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
