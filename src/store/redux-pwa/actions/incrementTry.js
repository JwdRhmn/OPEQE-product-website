import { INCREMENT_REQUEST_TRY } from "../config";

export default id => {
	return {
		type: INCREMENT_REQUEST_TRY,
		payload: id,
	}
}