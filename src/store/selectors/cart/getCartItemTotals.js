import getItemTotals from "./getItemTotals";
import { createSelector } from 'reselect';


export default createSelector(
  	[ 
		state => state.cart.details,
  	],
	cart => getItemTotals(cart)
);