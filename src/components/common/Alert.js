import React, { Component } from 'react';
import './Alert.scss';
import classNames from 'classnames';

const types = ['error', 'success', 'warning'];

class Alert extends Component {

	render() {
		const { type, content = null } = this.props;
		if (!types.includes(type)) {
			console.error('Alert Component: wrong alert type. Received: ', type);
			return null;
		}
		if (!content) return null;

		const classes = classNames({
			alert: true,
			[type]: true,
		});

		return (
			<div className={classes}>{ content }</div>
		);

	}

}

export default Alert;
