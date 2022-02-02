import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
  	[ 
		  state => state.user.verifyEmail,
  	],
	verifyEmail => transform(verifyEmail),
)




const transform = verifyEmail => {
    const data = transformData(verifyEmail.data);
    return  {
        data,
        status: getStatus(verifyEmail.status),
    };
}


const transformData = data => ({
	success: data.isSucceeded && data.isValid,
})