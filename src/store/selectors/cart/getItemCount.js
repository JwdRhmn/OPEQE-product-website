import { createSelector } from 'reselect';

export default createSelector(
  	[ 
		state => state.cart.details.items,
  	],
	items => items.reduce( (total, item) => (total + item.quantity), 0),
);