import { createSelector } from 'reselect';

export default createSelector(
  	[ 
		state => state.cart.details.items,
		state => state.cart.details.id,
  	],
	(items, id) => {
		const newItems = items.map(
			item => {
				return {
					id: item.id,
					key: item.key,
					title: item.title,
					basePrice: item.price,
					image: item.image,
					quantity: item.quantity,
					options: item.options.map( option => {
						return {
							name: option.title,
							price: option.price,
						}
					})
				}
			}
		);

		const totalCount = items.reduce( (total, item) => (total + item.quantity), 0);

		return {
			id: id,
			items: newItems,
			totals: {
				quantity: totalCount,
			}
		};
	},
);