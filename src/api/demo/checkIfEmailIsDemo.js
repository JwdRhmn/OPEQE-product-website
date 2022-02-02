import { 
    checkIfEmailIsDemoURl,
} from "../config/api";

import { 
	appId,
} from "../config/app";


export default function(data = {}){
      
    const body = data;    

    return {
        url: `${checkIfEmailIsDemoURl}`,
        key: `${checkIfEmailIsDemoURl}`,
        body,
        method: 'post',
    }
}