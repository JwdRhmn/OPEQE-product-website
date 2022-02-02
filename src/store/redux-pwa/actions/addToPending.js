import { ADD_TO_PENDING } from "../config";

export default data => {
	return {
		type: ADD_TO_PENDING,
		payload: data,
	}
}