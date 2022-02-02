import { 
    userLoginURL,
} from "../config/api";

import { 
    appId,
    appType,
} from "../config/app";

import { 
    locationId,
} from "../config/store";

export default function({
    phone, 
	pass, 
} = {}){


    const body = {
        Apptype: appType,
		AppId: appId,
        LocationId: locationId,
		Username: phone,
		Password: pass,
		//DeviceId: "",
    }   

        
    return {
        url: `${userLoginURL}`,
        key: `${userLoginURL}`,
        body,
        method: 'post',
    }
}