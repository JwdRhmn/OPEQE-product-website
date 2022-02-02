import { 
    editUserNameURL,
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
        url: `${editUserNameURL}`,
        key: `${editUserNameURL}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body,
        method: 'post',
    }
}