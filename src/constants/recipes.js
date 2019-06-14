export const RECIPE_TYPES = {
	vege: { value: 'vege', name: 'Vege', icon: 'vege.svg' },
	vegan: { value: 'vegan', name: 'Vegan', icon: 'vegan.svg' },
	vit: { value: 'vit', name: 'Vit', icon: 'vit.svg' },
};

export const PREPARATION_TYPES = {
	null: {	value: 'null', name: '', icon: 'non-preparation.svg' },
	cook: { value: 'cook', name: 'Gotowanie', icon: 'cook.svg' },
	cook_with_steam: { value: 'cook_with_steam', name: 'Na parze', icon: 'cook-with-steam.svg' },
	fried: { value: 'fried', name: 'Smażone', icon: 'fried.svg' },
	baked: { value: 'baked', name: 'Pieczone', icon: 'baked.svg' },
};

export const RATINGS = {
	null: {	value: 'null', name: '', icon: 'non-medal.svg' },
	good: { value: 'good', name: 'Dobre', icon: 'bronze-medal.svg' },
	well: { value: 'well', name: 'Świetne', icon: 'silver-medal.svg' },
	perfect: {value: 'perfect', name: 'Mniam!', icon: 'gold-medal.svg' },
};

export const DISH_TYPE = {
	dry_dish: {	value: 'dry_dish', name: 'Danie wytrawne', icon: 'dry-dish.svg' },
	salad: { value: 'salad', name: 'Sałatka, surówka', icon: 'salad.svg' },
	sweet_dish: { value: 'sweet_dish', name: 'Danie na słodko', icon: 'sweet-dish.svg' },
	soup: {value: 'soup', name: 'Zupa', icon: 'soup.svg' },
	drink: {value: 'drink', name: 'Napój, kontajl, mleko', icon: 'milk.svg' },
	lubricant: {value: 'lubricant', name: 'Sos, serek, smarowidło, pasta', icon: 'jam.svg' },
	dessert: {value: 'dessert', name: 'Deser, ciasto, ciasteczka', icon: 'bun.svg' },
	snack: {value: 'snack', name: 'Przekąska, chlebek', icon: 'sandwich.svg' },
};

export const TIME_OF_DAY = {
	breakfast: { value: 'breakfast', name: 'Śniadanie' },
	second_breakfast: { value: 'second_breakfast', name: 'Drugie Śniadanie' },
	dinner: { value: 'dinner', name: 'Obiad' },
	tea: { value: 'tea', name: 'Przekąska' },
	supper: { value: 'supper', name: 'Kolacja' },
};

export const RECIPE_TYPES_ARRAY = Object.entries(RECIPE_TYPES).map(([,data]) => data);
export const PREPARATION_TYPES_ARRAY = Object.entries(PREPARATION_TYPES).map(([,data]) => data);
export const RATINGS_ARRAY = Object.entries(RATINGS).map(([,data]) => data);
export const DISH_TYPE_ARRAY = Object.entries(DISH_TYPE).map(([,data]) => data);
export const TIME_OF_DAY_ARRAY = Object.entries(TIME_OF_DAY).map(([,data], index) => {
	data.checked = index === 0;
	return data;
});
