import { ADD_TO_DELAYED } from "../config";

export default data => {
	return {
		type: ADD_TO_DELAYED,
		payload: data,
	}
}