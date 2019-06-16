import React, { Component } from 'react';
import SelectSlider from '../../../components/common/SelectSlider';
import {
	PREPARATION_TYPES_ARRAY,
	RECIPE_TYPES_ARRAY,
	RATINGS_ARRAY,
	TIME_OF_DAY_ARRAY,
	DISH_TYPE_ARRAY,
} from '../../../constants/recipes';
import Icon from '../../../components/common/Icon';
import Switch from '../../../components/common/Switch';
import MultiDropdown from '../../../components/common/Dropdown/MultiDropdown';

const allSelected = arr => arr.map(type => ({ ...type, selected: true }));

class SearchRecipes extends Component {

	constructor(props) {
		super(props);

		this.state = {
			time_of_day: TIME_OF_DAY_ARRAY.map(({ value }, index) => ({ value, checked: true, index })),
			preparation_types: allSelected(PREPARATION_TYPES_ARRAY),
			recipe_types: allSelected(RECIPE_TYPES_ARRAY),
			dish_types: allSelected(DISH_TYPE_ARRAY),
			ratings: allSelected(RATINGS_ARRAY),
			tested: true,
			name: '',
			isClosed: false,
		}

		// this.handleFiltersClick = this.handleFiltersClick.bind(this);
		this.handleTimeDay = this.handleTimeDay.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleSearchClick = this.handleSearchClick.bind(this);
		this.handleTestingSelect = this.handleTestingSelect.bind(this);

		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
	}

	handleNameChange(e) { this.setState({ name: e.target.value }); }

	handleFiltersClick(type, values) {
		this.setState(state => {
			const filters = state[type].map(filter => ({
				...filter,
				selected: values.includes(filter.value)
			}));
			return {
				...state,
				[type]: filters,
			}
		});
	}

	handleTimeDay(index) {
		this.setState(state => {
			let { time_of_day } = state;
			time_of_day[index].checked = !time_of_day[index].checked;
			time_of_day[index].selected = !time_of_day[index].selected;
			return { time_of_day };
		});
	}

	handleSearchClick() {
		if (this.props.onSearch) this.props.onSearch(this.state);
	}

	handleTestingSelect(tested) {
		this.setState({ tested })
	}

	close() {
		this.setState({ isClosed: true });
		if (this.props.onReset) this.props.onReset();
	}

	open() {
		const { isClosed } = this.state;
		if (!isClosed) return;
		this.setState({ isClosed: false })
	}

  render() {
		const {
			time_of_day,
			tested,
			name,
			isClosed,
			recipe_types,
			dish_types,
			preparation_types,
			ratings,
		} = this.state;

    return (
			<div id="searchRecipes" data-is-closed={isClosed} onClick={this.open}>
				<div className="searchRecipes--body">
					<div className="searchRecipes--header">
						<h3 className="searchRecipes--title">Szukaj według</h3>
						<div className="searchRecipes--close" onClick={this.close}>
							<Icon src={'close.svg'}/>
						</div>
					</div>
					<div className="searchRecipes--top-wrapper">
						<Switch checked={tested} label="Testowane" name="tested" onChange={this.handleTestingSelect} />
						<MultiDropdown
							options={ratings}
							placeholder={{ icon: 'non-medal.svg'}}
							onSelect={values => this.handleFiltersClick('ratings', values)}
						/>
					</div>

					<hr />
					<SelectSlider
						items={time_of_day}
						page={0}
						itemsPerPages={[2, 2, 1]}

						render={
							items => items.map(({ checked, value, index }) => (
								<label className="checkbox" key={value}>
									<input
										key={value}
										type="checkbox"
										name={TIME_OF_DAY_ARRAY[index].name}
										id={value+'checkbox'}
										checked={checked}
										onChange={() => this.handleTimeDay(index)}/>
									<div className="checkbox-control"></div>
									{TIME_OF_DAY_ARRAY[index].name}
								</label>
							))
						}
					/>
					<hr />

					<div className="searchRecipes--name-wrapper">
						<input
							name="name"
							onChange={this.handleNameChange}
							placeholder="Nazwa przepisu"
							value={name}
							type="text"/>
					</div>

					<div className="searchRecipes--filters">
						<MultiDropdown
							options={preparation_types}
							placeholder={{ icon: 'preparation-type.svg'}}
							onSelect={values => this.handleFiltersClick('preparation_types', values)}
						/>

						<MultiDropdown
							options={recipe_types}
							placeholder={{ icon: 'eat-type.svg'}}
							onSelect={values => this.handleFiltersClick('recipe_types', values)}
						/>

						<MultiDropdown
							options={dish_types}
							placeholder={{ icon: 'dish_type.svg'}}
							onSelect={values => this.handleFiltersClick('dish_types', values)}
						/>
					</div>
					<div className="horizontal-center searchRecipes--search-wrapper">
						<button
							type="button"
							className="primary small button"
							onClick={this.handleSearchClick}>
								SZUKAJ
						</button>
					</div>
				</div>
				<div className="searchRecipes--tab" hidden={!isClosed}>
					<h4>SZUKAJ</h4>
				</div>
			</div>
    );
	}
}

export default SearchRecipes;
