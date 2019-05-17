import React, { Component } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import Switch from '../../../components/common/Switch';
import Dropdown from '../../../components/common/Dropdown/Dropdown';
import {
	RECIPE_TYPES,
	PREPARATION_TYPES,
	RATINGS,
	RECIPE_TYPES_ARRAY,
	PREPARATION_TYPES_ARRAY,
	RATINGS_ARRAY,
} from '../../../constants/recipes';

class ListItem extends Component {

	isVitarian(type) { return type === 'vit'; }

  render() {
		let { name, type, preparation_type, rating, id, doc_id, tested } = this.props;
    return (
			<Link to={ROUTES.RECIPE.replace(':id', doc_id)} className="item">
				<h4 className="name">{id}. {name}</h4>
				<div className="options">
					<Switch checked={tested} label="Testowane" name="tested" disabled={true} />
					<Dropdown
						options={RECIPE_TYPES_ARRAY}
						selected={type}
						viewOnly={true}>
					</Dropdown>
					<Dropdown
						options={PREPARATION_TYPES_ARRAY}
						selected={preparation_type}
						viewOnly={true}
						disabled={this.isVitarian(type)}>
					</Dropdown>
					<Dropdown
						options={RATINGS_ARRAY}
						selected={rating}
						viewOnly={true}>
					</Dropdown>
				</div>
			</Link>
    );
  }
}

export default ListItem;
