import React from 'react';

import { storiesOf } from '@storybook/react';

import '../App.css';

import { Title, ShelfChanger } from '../components';

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
