import PropTypes from 'prop-types';

export const BookType = {};

export const ShelfType = PropTypes.shape({
  tag: PropTypes.string,
  value: PropTypes.string,
  books: PropTypes.arrayOf(BookType),
});
