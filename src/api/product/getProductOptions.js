import { 
	getProductOptionsURL,
} from "../config/api";

import { 
    appId,
    appType,
} from "../config/app";

import { 
    locationId,
} from "../config/store";


export default function({
	id,
	token,
} = {}){

	const body = {
		Apptype: appType,
		AppId: appId,
		LocationId: locationId,
		Id: id,
	}	

		
   	return {
   		url: getProductOptionsURL,
   		key: getProductOptionsURL,
   		headers: {
            Authorization: `Bearer ${token}`,
        },
   		body,
   		method: 'post',
   	}
}