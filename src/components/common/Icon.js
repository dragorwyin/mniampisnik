/* global process */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Icon extends Component {

  render() {
		const { src, alt = '', width, height } = this.props;
    return (
			<img src={ process.env.PUBLIC_URL + '/images/icons/' + src } alt={alt} width={width} height={height} />
    );
  }
}

Icon.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
}

export default Icon;
