import React, { Component } from 'react';
import './toast.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { hide } from '../../../store/actions/notifyActions';

class Toast extends Component {

	constructor(props) {
		super(props);

		this.types = {
			error: {
				name: 'error',
				icon: 'alert',
			},
			success: {
				name: 'success',
				icon: 'checkmark-circle',
			},
		};
	}

	getClasses() {
		const { type } = this.props;
		const classes = Object.entries(this.types).map(([key]) => ({ [key] : type === key }));
		return classNames(classes);
	}

	isAllowedType(type) {
		const { error, success } = this.types;
		return [error.name, success.name].includes(type);
	}

	hide() {
		this.timeout = setTimeout(() => {
			this.props.hide();
			this.timeout = null;
		}, 5000);
	}

	render() {
		let { type = '', message = '', visible = false } = this.props;
		if (visible && !this.timeout) this.hide();
		type = this.isAllowedType(type) ? type : this.types.error.name;

		return (
			<div id="toast" className={this.getClasses()} data-visible={visible}>
				<i className={`icon ion-md-${this.types[type].icon}`}></i>
				<span>{ message }</span>
			</div>
		);
	}

}

const mapStateToProps = state => ({
	type: state.notify.type,
	message: state.notify.message,
	visible: state.notify.visible,
});

const mapDispatchToProps = (dispatch) => ({
	hide: () => dispatch(hide()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
