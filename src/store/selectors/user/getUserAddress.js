import { createSelector } from 'reselect';


export default createSelector(
  	[ 
		state => state.user.address.get.list,
  	],
	addresses => addresses,
)