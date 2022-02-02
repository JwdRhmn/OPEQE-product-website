import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
  	[ 
		state => state.cart.cancelOrder,
  	],
	cancel => transform(cancel),
)




const transform = cancel => {
    const data = transformData(cancel.data);
    return  {
        data: {
        	isSucceeded: data.isDeleted,
        	...data,
        },
        status: getStatus(cancel.status),
    };
}


const transformData = data => data