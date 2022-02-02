import { SET_REQUEST_FULFILLED } from "../config";

export default key => {
	return {
		type: SET_REQUEST_FULFILLED,
		payload: key,
	}
}