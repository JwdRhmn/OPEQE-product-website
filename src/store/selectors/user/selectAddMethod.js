import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
  	[ 
		state => state.user.paymentMethods.add,
  	],
	addMethod => transform(addMethod),
)




const transform = addMethod => {
    return  {
        status: getStatus(addMethod.status),
    };
}
