export const RECIPE_TYPES = {
	VEGE: { value: 'vege', name: 'Vege', icon: 'vege.svg' },
	VEGAN: { value: 'vegan', name: 'Vegan', icon: 'vegan.svg' },
	VITARIAN: { value: 'vitarian', name: 'Vit', icon: 'vit.svg' },
};

export const PREPARATION_TYPES = {
	COOK: { value: 'cook', name: 'Gotowanie', icon: 'cook.svg' },
	COOK_WITH_STEAM: { value: 'cook_with_steam', name: 'Na parze', icon: 'cook-with-steam.svg' },
	FRIED: { value: 'fried', name: 'Smażone', icon: 'fried.svg' },
	BAKED: { value: 'baked', name: 'Pieczone', icon: 'baked.svg' },
};

export const RATINGS = {
	NONE: {	value: '', name: '', icon: 'non-medal.svg' },
	GOOD: { value: 'good', name: 'Dobre', icon: 'bronze-medal.svg' },
	WELL: { value: 'well', name: 'Świetne', icon: 'silver-medal.svg' },
	PERFECT: {value: 'perfect', name: 'Mniam!', icon: 'gold-medal.svg' },
};

export const TIME_OF_DAY = {
	BREAKFAST: { value: 'breakfast', name: 'Śniadanie' },
	SEC_BREAKFAST: { value: 'second_breakfast', name: 'Drugie Śniadanie' },
	DINNER: { value: 'dinner', name: 'Obiad' },
	TEA: { value: 'tea', name: 'Przekąska' },
	SUPPER: { value: 'supper', name: 'Kolacja' },
};

export const RECIPE_TYPES_ARRAY = Object.entries(RECIPE_TYPES).map(([,data]) => data);
export const PREPARATION_TYPES_ARRAY = Object.entries(PREPARATION_TYPES).map(([,data]) => data);
export const RATINGS_ARRAY = Object.entries(RATINGS).map(([,data]) => data);
export const TIME_OF_DAY_ARRAY = Object.entries(TIME_OF_DAY).map(([,data], index) => {
	data.checked = index === 0;
	return data;
});
