import { 
    checkIfNewUserURL,
} from "../config/api";

import { 
    appId,
    appType,
} from "../config/app";

import { 
    locationId,
} from "../config/store";

export default function({ phone }){                                     
    
    const body = {
        Apptype: appType,
        AppId: appId,
        LocationId: locationId,
        Wireless: phone,
    }  

    return {
        url: checkIfNewUserURL,
        key: checkIfNewUserURL,
        body,
        method: 'post',
    } 
}
