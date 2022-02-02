import { REMOVE_FROM_DELAYED } from "../config";

export default data => {
	return {
		type: REMOVE_FROM_DELAYED,
		payload: data,
	}
}