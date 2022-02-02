import { createSelector } from 'reselect';

export default createSelector(
  	[ 
		state => state.notification.details
  	],
	details => transform(details),
)




const transform = details => details
