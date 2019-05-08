import React, { Component } from 'react';
import './styles.scss';
import Icon from '../../../components/common/Icon';
import {
	RECIPE_TYPES,
	PREPARATION_TYPES,
	RATINGS,
} from '../../../constants/recipes';

class ListItem extends Component {

  render() {
		let { name, type, preparation_type, rating, id } = this.props;
		type = RECIPE_TYPES[type];
		preparation_type = PREPARATION_TYPES[preparation_type];
		rating = RATINGS[rating];
    return (
			<div className="item">
				<h4 className="name">{id}. {name}</h4>
				<div className="selected"><Icon src={type.icon} /> <span>{type.name}</span></div>
				<div className="selected"><Icon src={preparation_type.icon} /> <span>{preparation_type.name}</span></div>
				<div className="selected"><Icon src={rating.icon} /></div>
			</div>
    );
  }
}

export default ListItem;
