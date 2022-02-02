import { createSelector } from 'reselect';

export default createSelector(
  	[ 
		state => state.user.deliveryCondition,
  	],
	delivery => transform(delivery),
)


const transform = ({
	type,
	schedule,
	reserve,
}) => {

	let fullType = '';
	let shortType = '';
	let typeCode = '';

	switch(type){
		case 'delivery': {
			if(schedule) {
				fullType += "Scheduled ";
			} else {
				fullType += "ASAP ";
			}
			fullType += 'Delivery';
			shortType = 'Delivery';
			typeCode = "delivery";
			break;
		}
		case 'pickup': {
			if(schedule) {
				fullType += "Scheduled ";
			} else {
				fullType += "ASAP ";
			}
			fullType += 'Pickup';
			shortType = 'Pickup';
			typeCode = "pickup";
			break;
		}
		case 'reserve': {
			fullType += "Reserve";
			shortType = "Reserve";
			typeCode = "reserve";
		}
		default: 
			break;
	}

	
	return {
		type: {
			full: fullType,
			short: shortType,
			code: typeCode,
		},
		schedule,
		reserve,
	}
}	

