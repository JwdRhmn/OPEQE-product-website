import { 
	addReserveURL,
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
 		url: addReserveURL,
 		key: addReserveURL,
 		headers: {
          Authorization: `Bearer ${token}`,
      },
 		body,
 		method: 'post',
 	}
}