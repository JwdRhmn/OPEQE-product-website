import { 
    getDistanceURL,
} from "../config/api";

import { 
    appId,
    appType,
} from "../config/app";

import { 
    locationId,
} from "../config/store";

export default function({ 
    origin,
    dest,
}){                                     


    return {
        url: getDistanceURL + `&origins=${origin.lat},${origin.lng}&destinations=${dest.lat}%2C${dest.lng}`,
        key: getDistanceURL,
        method: 'get',
    } 
}
