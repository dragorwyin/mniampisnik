import React, { Component } from 'react';
import './styles.scss';
import Icon from '../../common/Icon';

class ListItem extends Component {

  render() {
		const { id, name, type, preparation_type, rating } = this.props;
    return (
			<div className="item">
				<h4 className="name">{id}. {name}</h4>
				<div className="selected"><Icon src={type.icon} /> <span>{type.name}</span></div>
				<div className="selected"><Icon src={preparation_type.icon} /> <span>{preparation_type.name}</span></div>
				<div className="selected"><Icon src={rating.icon} /> <span>{rating.name}</span></div>
			</div>
    );
  }
}

export default ListItem;
