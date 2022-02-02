import { 
    getUserAddressURL,
} from "../config/api";


export default function({
    token, 
} = {}){
      
    return {
        url: `${getUserAddressURL}`,
        key: `${getUserAddressURL}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: 'get',
    }
}