import { 
    fetchUserRewardsURL,
} from "../config/api";

import { 
    appId,
} from "../config/app";


export default function({
    token, 
    ...data
} = {}){
      
    const body = {
        AppId: appId,
        ...data,
    };    

    return {
        url: `${fetchUserRewardsURL}`,
        key: `${fetchUserRewardsURL}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body,
        method: 'post',
    }
}