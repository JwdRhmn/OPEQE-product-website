import { 
	submitShoppingCartURL,
} from "../config/api";

import { 
	appId,
} from "../config/app";

import { 
	locationId,
} from "../config/store";

export default function({
	data,
	token,
} = {}){

	const body = {
    appId,
    locationId,
    ...data,
  };

		
 	return {
 		url: submitShoppingCartURL,
 		key: submitShoppingCartURL,
 		headers: {
          Authorization: `Bearer ${token}`,
      },
 		body,
 		method: 'post',
 	}
}

