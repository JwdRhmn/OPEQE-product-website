import { createSelector } from 'reselect';

import mapItems from "./functions/mapItems";
import orderTypeToTxt from "./functions/orderTypeToTxt";

export default () => createSelector(
  	[ 
		selectSimilars,
		state => state.product.items,
		state => state.product.favoriteItems.data,
		state => state.user.deliveryCondition
  	],
	(similarItems, product, favoriteIDs, deliveryCondition) => {

		const similarItemsMapped = similarItems.map(
			item => mapItems(item, favoriteIDs)
		);

		const fee = product.data.fee;
		const feeLabel = orderTypeToTxt(deliveryCondition.type, fee);

		return {
			items: similarItemsMapped,
			feeLabel: feeLabel,
			deliveryFee: fee,
		};
	},
);


const selectSimilars = (state, props) => {
	const items = state.product.items;
	const itemsIfExists = items.data.items;

	if(!itemsIfExists){
		return false;
	}

	const id = props.itemId;

	const category = props.category;
	const type = props.type;
	const manufacturer = props.manufacturer;
	const feature = props.feature;

	const match = {
		category: [],
		manufacturer: [],
		type: [],
		feature: [],
	};

	const matchedIds = [ id ];

	for(let i = 0; i < itemsIfExists.length; i++){
		if(itemsIfExists[i].category.title === category && !isMatchedBefore(itemsIfExists[i].id)){
			match.category.push(itemsIfExists[i]);
		}
		if(itemsIfExists[i].manufacturer.title === manufacturer && !isMatchedBefore(itemsIfExists[i].id)){
			match.manufacturer.push(itemsIfExists[i]);
		}
		if(itemsIfExists[i].type.title === type && !isMatchedBefore(itemsIfExists[i].id)){
			match.type.push(itemsIfExists[i]);
		}
		if(itemsIfExists[i].feature.title === feature && !isMatchedBefore(itemsIfExists[i].id)){
			match.feature.push(itemsIfExists[i]);
		}
	}

	return (
		match.category.concat(
			match.type.concat(
				match.manufacturer.concat(
					match.feature
				)
			)
		)
	);


	function isMatchedBefore(id){
		if(matchedIds.includes(id)){
			return true;
		}
		matchedIds.push(id);
		return false;
	}
}
