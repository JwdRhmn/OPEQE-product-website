import produce from "immer";
import { createSelector } from "reselect";

import mapItems from "./functions/mapItems";

const filterType = (state, props) => props.filterTypes;

const filterValue = (state, props) => props.filterValue ? props.filterValue.toLowerCase() : '';

const getProduct = state => state.product.items;

export default () => {
	return createSelector(
		[
			filterType, 
			filterValue, 
			getProduct,
			state => state.product.favoriteItems.data
		],
		(types, value, items, favoriteIDs) => {
			const outItems = [];
			(items.data.items || []).forEach((item, index) => {
				if (match(item, types, value)) {
					outItems.push( mapItems(item, favoriteIDs) );
				}
			});
			
			return produce(items, draft => {
				draft.data = {
					items: outItems
				};
			});
		}
	);
};

const match = (item, types = [], value) => {
	let condition = true;
	for (let i = 0; i < types.length; i++) {
		switch (types[i]) {
			case "title":
				condition = condition && includes(item.title, value);
				break;
			case "categoryTitle":
				condition = condition && includes(item.category.title, value);
				break;
			case "ingredients":
				condition = condition && includes(item.ingredients, value);
				break;
			case "manufacturerTitle":
				condition = condition && includes(item.manufacturer.title, value);
				break;
			case "typeTitle":
				condition = condition && includes(item.type.title, value);
				break;
			case "featureTitle":
				condition = condition && includes(item.feature.title, value);
				break;
		}

		if (condition) {
			return true;
		}
	}

	return false;
};


const includes = (str, search) =>  str.toLowerCase().includes(search)