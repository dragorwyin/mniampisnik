import { RECIPE_TYPES, PREPARATION_TYPES, RATINGS, TIME_OF_DAY } from '../../constants/recipes';

export const initState = [
	{
		id: 1,
		name: 'przepis',
		tested: true,
		type: RECIPE_TYPES.VEGAN,
		preparation_type: PREPARATION_TYPES.BAKED,
		rating: RATINGS.GOOD,
		time_of_day: TIME_OF_DAY.BREAKFAST,
	}, {
		id: 2,
		name: 'Justyny ulubiony przepis',
		tested: true,
		type: RECIPE_TYPES.VEGAN,
		preparation_type: PREPARATION_TYPES.BAKED,
		rating: RATINGS.GOOD,
		time_of_day: TIME_OF_DAY.BREAKFAST,
	},
];
