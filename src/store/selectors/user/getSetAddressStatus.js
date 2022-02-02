import { createSelector } from 'reselect';


export default createSelector(
  	[ 
		state => state.user.address.set.status,
  	],
	status => status,
)