import { createSelector } from 'reselect';

export default createSelector(
  	[ 
		state => state.user.info.data.token,
  	],
	token => token,
)