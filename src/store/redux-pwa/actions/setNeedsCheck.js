import { SET_NEEDS_CHECK } from "../config";

export default value => {
	return {
		type: SET_NEEDS_CHECK,
		payload: value,
	}
}