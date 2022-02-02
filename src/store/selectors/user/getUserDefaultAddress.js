import { createSelector } from 'reselect';


export default createSelector(
  	[ 
		state => state.user.address.get.list,
  	],
	addresses => {
		if(!addresses || !addresses.length){
			return null;
		}

		const defaultAddress = addresses.filter( address =>  address.isDefault)

		if(defaultAddress && defaultAddress.length > 0){
			return defaultAddress[0];
		}

		return addresses[0];
	},
)