import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
  	[ 
		state => state.demo.checkEmail
  	],
	checkEmail => transform(checkEmail),
)




const transform = checkEmail => {
    return  {
        status: getStatus(checkEmail.status),
    };
}
