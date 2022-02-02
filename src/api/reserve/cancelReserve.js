import { 
	canselReserveURL,
} from "../config/api";


export default function({
	token,
	id
} = {}){

	const body = {
		Reservation: id,
	}			
 	return {
 		url: canselReserveURL,
 		key: canselReserveURL,
 		headers: {
          Authorization: `Bearer ${token}`,
      },
 		body,
 		method: 'post',
 	}
}