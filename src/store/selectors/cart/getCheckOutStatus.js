import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";



export default createSelector(
  	[ 
		state => state.cart.checkOut,
  	],
	checkOut => transform(checkOut)
);

const transform = checkOut => {
    return  {
        status: getStatus(checkOut.status),
    };
}