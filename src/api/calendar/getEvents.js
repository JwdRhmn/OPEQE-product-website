import { 
	getCalendarEventsURL,
} from "../config/api";

import { 
	appId,
} from "../config/app";

import { 
	locationId,
} from "../config/store";


export default function({
	token,
} = {}){

	const body = {
		appId: appId,
		locationId: locationId,
		options: [],
	}	

		
   	return {
   		url: getCalendarEventsURL,
   		key: getCalendarEventsURL,
   		headers: {
            Authorization: `Bearer ${token}`,
        },
   		body,
   		method: 'post',
   	}
}