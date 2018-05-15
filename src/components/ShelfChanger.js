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
    currentShelfIndex: -1,
  };

  static propTypes = {
    shelves: PropTypes.arrayOf(PropTypes.shape({
      tag: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })),
    onMoveTo: PropTypes.func,
    currentShelfIndex: PropTypes.number,
  };

  state = {
    currentShelfIndex: this.props.currentShelfIndex || -1,
  };

  moveTo = (e) => {
    const { shelves, onMoveTo } = this.props;
    const selectedIndex = e.target.selectedIndex - 1; // NOTE: adjusting for "Move to..." option
    const destinationShelf = shelves[selectedIndex];

    onMoveTo(destinationShelf);

    this.setState(prev => ({ ...prev, currentShelfIndex: selectedIndex }));
  };

  render() {
    const { shelves } = this.props;
    const { currentShelfIndex } = this.state;
    const options = shelves.map(ShelfChangerItem);
    const selectedShelf = shelves[currentShelfIndex];
    const selectedValue = (selectedShelf && selectedShelf.value) || 'no-shelf';

    return (
      <div className="book-shelf-changer">
        <select value={selectedValue} onChange={this.moveTo}>
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
