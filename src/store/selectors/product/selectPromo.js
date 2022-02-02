import { createSelector } from 'reselect';
import produce from "immer";

export default createSelector(
  	[ 
		state => state.product.items,
  	],
	items => {
		const promoItems = [];

		(items.data.items || []).forEach( ({
			id,
			special,
			image,
			category: { 
				title: category,
			},
			manufacturer: { 
				title: manufacturer,
			},
			type: { 
				title: type,
			},
		}) => {
			if(!special){
				return;
			}

			const item = {
				id: id,
				image: image,
				title: special.title.trim().replace(/^use /i, ''),
				subTitle: special.description,
				description: special.policy,
				category,
				manufacturer,
				type
			};


			if(special.title){
				promoItems.push(item);
			}
		});

		return produce(items, draft => {
			draft.data = promoItems;
		});
	},
);