import { 
    editUserPaymentMethodURL,
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
        url: `${editUserPaymentMethodURL}`,
        key: `${editUserPaymentMethodURL}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body,
        method: 'post',
    }
}