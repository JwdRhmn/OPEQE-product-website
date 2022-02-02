import produce from 'immer';

import fetchProductItemsReducer from "./fetchProductItemsReducer";
import favoriteItemsReducer from "./favoriteItemsReducer";
import optionsReducer from "./optionsReducer";


export const initialState = {};

export default (state = initialState, action) => {

	const {
		items,
		options,
		favoriteItems,
	} = state;

	const fetchProductItems = fetchProductItemsReducer(items, action);
	const favoriteItemsReduced = favoriteItemsReducer(favoriteItems, action);
	const optionsReduced = optionsReducer(options, action);

	return produce(state, finalState => {
		finalState.items = fetchProductItems;
		finalState.favoriteItems = favoriteItemsReduced;
		finalState.options = optionsReduced;
	})
}
