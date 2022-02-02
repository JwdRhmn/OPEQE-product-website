import { 
	fetchOrderHistoryURL,
} from "../config/api";


export default function({
	token,
} = {}){

	const body = {}	

		
 	return {
 		url: fetchOrderHistoryURL,
 		key: fetchOrderHistoryURL,
 		headers: {
          Authorization: `Bearer ${token}`,
    },
 		body,
 		method: 'get',
 	}
}