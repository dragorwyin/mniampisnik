/* global process */
import React, { Component } from 'react';

class Icon extends Component {

  render() {
		const { src, alt = '', width, height } = this.props;
    return (
			<img src={ process.env.PUBLIC_URL + 'images/icons/' + src } alt={alt} width={width} height={height} />
    );
  }
}

export default Icon;
