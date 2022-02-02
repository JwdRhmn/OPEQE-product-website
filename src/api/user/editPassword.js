import { 
    editUserPasswordURL,
} from "../config/api";

import { 
    appId,
} from "../config/app";

export default function({
    token, 
    ...data
} = {}){
      
    const body = {
        appId,
        ...data,
    };    

    return {
        url: `${editUserPasswordURL}`,
        key: `${editUserPasswordURL}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body,
        method: 'post',
    }
}