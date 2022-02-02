import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
  	[ 
		state => state.user.info,
  	],
	info => transform(info),
)




const transform = info => {
    const data = transformData(info.data);
    return  {
        data: data,
        status: getStatus(info.status),
    };
}


const transformData = data => data