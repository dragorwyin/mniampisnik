import React, { Component } from 'react';
import './Loader.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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

Loader.propTypes = {
	loading: PropTypes.bool.isRequired,
	fullpage: PropTypes.bool,
}

export default Loader;
