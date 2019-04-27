import React, { Component } from 'react';
import './Loader.scss';
import classNames from 'classnames';

class Loader extends Component {

	render() {
		if (!this.props.loading) return null;

		const classes = classNames({
			'loading': true,
			'fullpage': this.props.fullpage,
		});

		return (
			<div className={classes}>
				<div>
					<div className="cm-spinner"></div>
				</div>
			</div>
		);

	}

}

export default Loader;
