import { 
	removeFromFavoriteURL,
} from "../config/api";

import { 
    appId,
} from "../config/app";

export default function({
	token,
	...data
} = {}){

	const body = {
    	appId: appId,
		...data,
	}	
		
 	return {
 		url: removeFromFavoriteURL,
 		key: removeFromFavoriteURL,
 		headers: {
          Authorization: `Bearer ${token}`,
      },
 		body,
 		method: 'post',
 	}
}