import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ShelfChangerItem = ({ tag, value }) => (
  <option key={value} value={value}>
    {tag}
  </option>
);

ShelfChangerItem.propTypes = {
  tag: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

class ShelfChanger extends Component {
  static defaultProps = {
    shelves: [],
    onMoveTo: () => {},
    currentShelf: 'no-shelf',
  };

  static propTypes = {
    shelves: PropTypes.arrayOf(PropTypes.shape({
      tag: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })),
    onMoveTo: PropTypes.func,
    currentShelf: PropTypes.string,
  };

  state = {
    currentShelf: this.props.currentShelf,
  };

  moveTo = (e) => {
    const { shelves, onMoveTo } = this.props;
    const selectedIndex = e.target.selectedIndex - 1; // NOTE: adjusting for "Move to..." option
    const currentShelf = shelves[selectedIndex].value;

    onMoveTo(currentShelf);

    this.setState(prev => ({ ...prev, currentShelf }));
  };

  render() {
    const { shelves } = this.props;
    const { currentShelf } = this.state;
    const options = shelves.map(ShelfChangerItem);

    return (
      <div className="book-shelf-changer">
        <select value={currentShelf} onChange={this.moveTo}>
          <option disabled value="no-shelf">
            Move to...
          </option>
          {options}
        </select>
      </div>
    );
  }
}

export default ShelfChanger;
