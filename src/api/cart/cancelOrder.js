import { 
	cancelOrderURL,
} from "../config/api";

export default function({
	token,
	...data
} = {}){

	const body = {
		...data
	};

		
 	return {
 		url: cancelOrderURL,
 		key: cancelOrderURL,
 		headers: {
          Authorization: `Bearer ${token}`,
      },
 		body,
 		method: 'post',
 	}
}

