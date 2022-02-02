import { 
    fetchUserReferralURL,
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
        appId,
        locationId,
    };    

    return {
        url: `${fetchUserReferralURL}`,
        key: `${fetchUserReferralURL}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body,
        method: 'post',
    }
}