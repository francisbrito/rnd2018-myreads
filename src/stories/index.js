import React from 'react';

import { storiesOf } from '@storybook/react';

import '../App.css';
import '../index.css';

import { Title, ShelfChanger, Book } from '../components';
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
  .add('with cover', () => (
    <Book
      title="To Kill a Mockingbird"
      authors={['Harper Lee']}
      coverImageUrl="http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
    />
  ))
  .add('with shelf changer', () => (
    <Book
      {...aBookData}
      coverImageUrl={aBookData.imageLinks.thumbnail}
      renderShelfChanger={() => <ShelfChanger shelves={SHELVES} currentShelf={aBookData.shelf} />}
    />
  ));
