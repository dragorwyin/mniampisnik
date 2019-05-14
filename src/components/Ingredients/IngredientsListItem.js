import React, { Component } from 'react';
import Icon from '../common/Icon';

class ListItem extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleEnter = this.handleEnter.bind(this);

		this.textarea = React.createRef();

		const {
			value = '',
			newItem = false,
			style = { height: 'auto' },
			disabled = false,
		} = props;

		this.state = { value, newItem, style, disabled };
	}

	componentDidMount() {
		this.setState({ style: { height: `${this.textarea.current.scrollHeight}px` } });
	}

	handleChange(e) {
		const { value, scrollHeight } = e.target;
		const style = {	height: `${scrollHeight}px` };

		this.setState({ value, style });
		this.props.onChange && this.props.onChange(e.target.value);
	}

	handleDeleteClick() {
		this.props.onDelete && this.props.onDelete();
	}

	handleEnter(e) {
		if (window.event.keyCode === 13) {
			e.preventDefault();
			if (this.props.onEnter && this.state.value) this.props.onEnter(e.target.value);
			if (this.state.newItem) this.setState({ value: '' });
		}
	}

	render() {
		const { value, style, disabled } = this.state;
		return (
			<div className="list-item">
				<textarea
					disabled={disabled}
					rows="1"
					placeholder="Wpisz nowy składnik..."
					onKeyPress={this.handleEnter}
					onChange={this.handleChange}
					style={style}
					value={value}
					ref={this.textarea}/>

					{ !disabled && value.length > 0 &&
						<div className="icon-wrapper" onClick={this.handleDeleteClick}>
							<Icon src="circle-x.svg" />
						</div> }
			</div>
		);
	}
}

export default ListItem;
