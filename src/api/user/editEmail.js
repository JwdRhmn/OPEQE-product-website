import { 
    editUserEmailURL,
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
        url: `${editUserEmailURL}`,
        key: `${editUserEmailURL}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body,
        method: 'post',
    }
}