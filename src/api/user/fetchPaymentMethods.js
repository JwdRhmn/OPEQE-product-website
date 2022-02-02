import { 
    fetchUserPaymentMethodsURL,
} from "../config/api";


export default function({
    token, 
} = {}){
      
    return {
        url: `${fetchUserPaymentMethodsURL}`,
        key: `${fetchUserPaymentMethodsURL}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: 'get',
    }
}