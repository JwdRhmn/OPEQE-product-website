import { 
	getProductURL,
} from "../config/api";

import { 
    appId,
    appType,
} from "../config/app";

import { 
    locationId,
} from "../config/store";


export default function({
	latitude,
	longitude,
	altitude,
	distance,
	floor,
	deviceId,
	token,
	messageToken,
} = {}){

	const body = {
		Apptype: appType,
		AppId: appId,
		LocationId: locationId,
		Latitude: latitude,
		Longitude: longitude,
		Altitude: altitude,
		Distance: distance, //? can skip ?
		Floor: floor,// ?
		DeviceId: deviceId,
		MessageToken: messageToken,
	}	

		
   	return {
   		url: getProductURL,
   		key: getProductURL,
   		headers: {
            Authorization: `Bearer ${token}`,
        },
   		body,
   		method: 'post',
   	}
}