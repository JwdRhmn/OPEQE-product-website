import { ADD_TO_READY } from "../config";

export default data => {
	return {
		type: ADD_TO_READY,
		payload: data,
	}
}