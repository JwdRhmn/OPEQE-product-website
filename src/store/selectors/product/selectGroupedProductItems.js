import { createSelector } from "reselect";
import produce from "immer";

import mapItems from "./functions/mapItems";
import orderTypeToTxt from "./functions/orderTypeToTxt";

export default createSelector(
	[
		state => state.product.items,
		state => state.product.favoriteItems.data,
		state => state.user.deliveryCondition
	],
	(items, favoriteIDs, deliveryCondition) => {
		const itemGroups = {
			happyhour: [],
			coupon: [],
			special: [],
			favourite: []
		};

		const totals = {
			category: [],
			manufacturer: [],
			feature: []
		}
		const filterGroups = [];
		const itemsById = {};

		const fee = items.data.fee;
		const feeLabel = orderTypeToTxt(deliveryCondition.type, fee);

		(items.data.items || []).forEach(itemData => {
			const item = mapItems(itemData, favoriteIDs);

			itemsById[item.id] = item;

			addFilterGroup(item, filterGroups);

			if (item.special && item.special.remainingTime) {
				itemGroups.happyhour.push(item);
			} else if (item.special && item.special.voucher) {
				itemGroups.coupon.push(item);
			} else if (item.special && item.special.title) {
				itemGroups.special.push(item);
			}
			if (itemData.isFavorite) {
				itemGroups.favourite.push(item);
			}

			pushIfNoTitleExist(totals.category, itemData.category);
			pushIfNoTitleExist(totals.manufacturer, itemData.manufacturer);
			pushIfNoTitleExist(totals.feature, itemData.feature);
		});


		const groups = [];
		if (itemGroups.happyhour.length) {
			groups.push({
				items: itemGroups.happyhour,
				type: "happyhour",
				title: "Happy Hour",
				subTitle: ""
			});
		}
		if (itemGroups.favourite.length) {
			groups.push({
				items: itemGroups.favourite,
				type: "favourite",
				title: "Your Favourites",
				subTitle: ""
			});
		}
		if (itemGroups.special.length) {
			groups.push({
				items: itemGroups.special,
				type: "special",
				title: "Special Offers",
				subTitle: ""
			});
		}
		if (itemGroups.coupon.length) {
			groups.push({
				items: itemGroups.coupon,
				type: "coupon",
				title: "Coupons",
				subTitle: ""
			});
		}

		const gatheredFilterGroups = gatherFilterGroups(filterGroups, itemsById);

		const allGroups = [];
		if(totals.category.length){
			allGroups.push({
				title: 'Categories',
				filterType: "categoryTitle",
				items: totals.category
			});
		}
		if(totals.manufacturer.length){
			allGroups.push({
				title: 'Manufacturers',
				filterType: "manufacturerTitle",
				items: totals.manufacturer
			});
		}
		if(totals.feature.length){
			allGroups.push({
				title: 'Features',
				filterType: "featureTitle",
				items: totals.feature
			});
		}

		return produce(items, draft => {
			draft.data = {
				feeLabel: feeLabel,
				deliveryFee: fee,
				groups: groups.concat(gatheredFilterGroups),
				allGroups: allGroups
			};
		});
	}
);

const addFilterGroup = (item, filters) => {
	addFilterIfNotExists("featureTitle", item.feature.title, item, filters);

	item.categories.forEach(category =>
		addFilterIfNotExists(category.searchType, category.text, item, filters)
	);
};

const addFilterIfNotExists = (type, value, item, filters) => {
	const filterIndex = getFilterIndex(type, value, filters);
	if (filterIndex !== -1) {
		filters[filterIndex].items.push(item);
	} else {
		filters.push({
			items: [item],
			type: type,
			title: value,
			subTitle: ""
		});
	}
};

const getFilterIndex = (type, value, filters) => {
	return filters.findIndex(
		filter => filter.type === type && filter.title === value
	);
};

const gatherFilterGroups = (filterGroups, itemsById) => {
	let group;
	let pureGroup;
	const gatheredGroups = [];
	const moreGroup = {
		items: [],
		type: 'more',
		title: 'More Food',
		subTitle: ""
	};


	for (let i = 0; i < filterGroups.length; i++) {
		group = filterGroups[i];
		if(group.items.length >= 3){
			pureGroup = {
				items: [],
				type: group.type,
				title: group.title,
				subTitle: group.subTitle,
			};
			for (let j = 0; j < group.items.length; j++) {
				if(itemsById[group.items[j].id]){
					pureGroup.items.push(group.items[j]);
					delete itemsById[group.items[j].id];
				}
			}
			gatheredGroups.push(pureGroup);
		}
	}

	for(const key in itemsById){
		moreGroup.items.push(itemsById[key]);
	}

	if(moreGroup.items.length){
		gatheredGroups.push(moreGroup);
	}

	return gatheredGroups;
};

const pushIfNoTitleExist = (array, item) => {
	const index = array.findIndex(arrayItem => arrayItem.title === item.title);
	if(index === -1){
		array.push(item);
	}
}


