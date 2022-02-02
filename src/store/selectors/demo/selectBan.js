import { createSelector } from 'reselect';

export default createSelector(
  	[ 
		state => state.demo.ban
  	],
	ban => transform(ban),
)




const transform = ban => ban
