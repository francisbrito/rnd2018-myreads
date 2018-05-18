import React from 'react';

import { storiesOf } from '@storybook/react';

import '../App.css';
import '../index.css';

import { Title, ShelfChanger, Book, Shelf } from '../components';
import { BOOKS, SHELVES } from './mock-data';

storiesOf('Title', module).add('with children', () => <Title>My Reads</Title>);

storiesOf('ShelfChanger', module)
  .add('without shelves', () => <ShelfChanger />)
  .add('with shelves', () => (
    <ShelfChanger shelves={[{ tag: 'one', value: 'one' }, { tag: 'two', value: 'two' }]} />
  ))
  .add('with selected shelf', () => (
    <ShelfChanger
      currentShelf="two"
      shelves={[{ tag: 'one', value: 'one' }, { tag: 'two', value: 'two' }]}
    />
  ));

const aBookData = BOOKS[0];

storiesOf('Book', module)
  .add('with cover', () => <Book {...aBookData} />)
  .add('without cover', () => <Book {...aBookData} imageLinks={null} />)
  .add('with shelf changer', () => (
    <Book
      {...aBookData}
      renderShelfChanger={() => <ShelfChanger shelves={SHELVES} currentShelf={aBookData.shelf} />}
    />
  ));

storiesOf('Shelf', module)
  .add('without books', () => <Shelf tag="Currently reading" value="currentlyReading" />)
  .add('with books', () => (
    <Shelf
      books={BOOKS.filter(b => b.shelf === 'wantToRead')}
      tag="Want to read"
      value="wantToRead"
    />
  ))
  .add('with books that have shelf changer', () => (
    <Shelf
      books={BOOKS.filter(b => b.shelf === 'wantToRead')}
      tag="Want to read"
      value="wantToRead"
      renderBook={b => (
        <Book
          key={b.title}
          coverImageUrl={b.imageLinks.thumbnail}
          renderShelfChanger={() => <ShelfChanger shelves={SHELVES} currentShelf={b.shelf} />}
          {...b}
        />
      )}
    />
  ));
