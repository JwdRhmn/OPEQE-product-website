import { 
    addUserPaymentMethodURL,
} from "../config/api";


export default function({
    token, 
    ...data
} = {}){
      
    const body = data;    

    return {
        url: `${addUserPaymentMethodURL}`,
        key: `${addUserPaymentMethodURL}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body,
        method: 'post',
    }
}