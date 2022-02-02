import { 
    setUserAddressURL,
} from "../config/api";


export default function({
    token, 
    address,
} = {}){
      
    const body = address;    

    return {
        url: `${setUserAddressURL}`,
        key: `${setUserAddressURL}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body,
        method: 'post',
    }
}