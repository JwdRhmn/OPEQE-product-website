import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
  	[ 
		state => state.reserve.add,
  	],
	addReserve => transform(addReserve),
)




const transform = addReserve => {
    const data = transformData(addReserve.data);
    return  {
        data: data,
        status: getStatus(addReserve.status),
    };
}


const transformData = data => data