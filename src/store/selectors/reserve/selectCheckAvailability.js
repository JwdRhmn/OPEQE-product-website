import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
  	[ 
		state => state.reserve.availability,
  	],
	availability => transform(availability),
)




const transform = availability => {
    const data = transformData(availability.data);
    return  {
        data: data,
        status: getStatus(availability.status),
    };
}


const transformData = data => data