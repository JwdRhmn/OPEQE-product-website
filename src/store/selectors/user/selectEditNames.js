import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
  	[ 
		state => state.user.editInfo.names,
  	],
	names => transform(names),
)




const transform = names => {
    return  {
        status: getStatus(names.status),
    };
}
