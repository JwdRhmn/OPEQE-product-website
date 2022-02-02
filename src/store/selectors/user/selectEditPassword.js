import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
  	[ 
		state => state.user.editInfo.password,
  	],
	password => transform(password),
)




const transform = password => {
    const data = transformData(password.data);
    return  {
        data,
        status: getStatus(password.status),
    };
}


const transformData = data => ({
	success: data.isSucceeded,
})