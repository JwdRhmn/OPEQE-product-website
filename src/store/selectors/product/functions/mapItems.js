import produce from "immer";

import calculateSpecial from "./calculateSpecial";
import mapOptions from "./mapOptions";
import mapSubscription from "./mapSubscription";

import objectToNameValArray from "./objectToNameValArray";

export default (
	item,
	favoriteIDs = {}
) => {

	const {
		title,
		subTitle,
		description,
		category: { 
			title: categoryTitle,
			color: categoryColor
		},
		manufacturer: { 
			title: manufacturerTitle,
			color: manufacturerColor
		},
		type: { 
			title: typeTitle,
			color: typeColor
		},
		feature: { 
			title: featureTitle,
			color: featureColor
		},
		price,
		special,
		image,
		gallery,
		id,
		preparation,
		isFavorite,
		compound,
		ingredients,
		options,
		beginTime,
		subscription
	} = item;

	const mappedOptions = options ? mapOptions(options) : [];
	const mappedSubscription = subscription ? mapSubscription(item) : {};

	const compoundPrsed = JSON.parse(compound);
	const compoundArray = objectToNameValArray(compoundPrsed);

	const ingredientsPrsed = JSON.parse(ingredients);
	const ingredientsArray = objectToNameValArray(
		ingredientsPrsed, 
		ingredientGroup => ingredientGroup.reduce(
			(total,ingredient) => total.concat(
				objectToNameValArray(ingredient, null, {searchType: "ingredients"})
			)
		, [])
	);		

	const galleryGathered = gallery ? gallery.split(',') : [];

	const itemData = {
		title: title,
		subTitle: subTitle,
		description: description,
		categories: [
			{ text: categoryTitle, type: "category", searchType: "categoryTitle" },
			{ text: manufacturerTitle, type: "manufacturer", searchType: "manufacturerTitle" }
		],
		category: {
			title: categoryTitle,
			color: categoryColor && `rgb(${categoryColor})`
		},
		manufacturer: {
			title: manufacturerTitle,
			color: manufacturerColor && `rgb(${manufacturerColor})`
		},
		type: {
			title: typeTitle,
			color: typeColor && `rgb(${typeColor})`
		},
		feature: {
			title: featureTitle,
			color: featureColor && `rgb(${featureColor})`
		},
		image,
		gallery: galleryGathered,
		price,
		id,
		compound: compoundArray,
		ingredients: ingredientsArray,
		preparation: preparation,
		timeEstimate: [preparation, parseInt(1.5 * preparation)],
		special,
		optionGroups: mappedOptions,
		subscription: mappedSubscription
	};

	const calculatedSpecial = special ? calculateSpecial(special) : {};

	return produce(itemData, draft => {
		draft.special = calculatedSpecial;
		draft.isFav = favoriteIDs[id];
	});
};
