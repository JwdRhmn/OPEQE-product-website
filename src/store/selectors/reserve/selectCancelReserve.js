import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
  	[ 
		state => state.reserve.cancel,
  	],
	cancel => transform(cancel),
)




const transform = cancel => {
    const data = transformData(cancel.data);
    return  {
        data: data,
        status: getStatus(cancel.status),
    };
}


const transformData = data => data