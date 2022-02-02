import { 
	getReserveHistoryURL,
} from "../config/api";


export default function({
	token,
} = {}){

	const body = {}	

		
   	return {
   		url: getReserveHistoryURL,
   		key: getReserveHistoryURL,
   		headers: {
            Authorization: `Bearer ${token}`,
        },
   		body,
   		method: 'get',
   	}
}