import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
  	[ 
		state => state.user.editInfo.email,
  	],
	email => transform(email),
)




const transform = email => {
    const data = transformData(email.data);
    return  {
        data,
        status: getStatus(email.status),
    };
}


const transformData = data => ({
	success: data.isSucceeded,
})