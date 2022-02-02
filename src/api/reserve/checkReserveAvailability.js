import { 
	checkReserveAvailabilityURL,
} from "../config/api";

import { 
    appId,
} from "../config/app";

import { 
    locationId,
} from "../config/store";

export default function({
	token,
	...data
} = {}){

	const body = {
    businessId: appId,
    locationId: locationId,
		...data,
	}	

		
 	return {
 		url: checkReserveAvailabilityURL,
 		key: checkReserveAvailabilityURL,
 		headers: {
          Authorization: `Bearer ${token}`,
      },
 		body,
 		method: 'post',
 	}
}