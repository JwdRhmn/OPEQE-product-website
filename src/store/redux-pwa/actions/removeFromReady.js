import { REMOVE_FROM_READY } from "../config";

export default key => {
	return {
		type: REMOVE_FROM_READY,
		payload: key,
	}
}