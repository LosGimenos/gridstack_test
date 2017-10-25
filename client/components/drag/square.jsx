import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    black: PropTypes.bool
  };

export default class Square extends Component {

  render() {
    const { black } = this.props;
    const fill = black ? 'black' : 'white';
    const stroke = black ? 'white' : 'black';

    return (
      <div style={{
        backgroundColor: fill,
        color: stroke,
        width: '100%',
        height: '100%'
      }}>
        {this.props.children}
      </div>
    );
  }
}

Square.propTypes = propTypes;
