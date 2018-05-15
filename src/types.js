import PropTypes from 'prop-types';

export const BookType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  shelf: PropTypes.string,
  imageLinks: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
  }),
});

export const ShelfType = PropTypes.shape({
  tag: PropTypes.string,
  value: PropTypes.string,
  books: PropTypes.arrayOf(BookType),
});
