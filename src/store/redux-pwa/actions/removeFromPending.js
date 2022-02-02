import { REMOVE_FROM_PENDING } from "../config";

export default key => {
	return {
		type: REMOVE_FROM_PENDING,
		payload: key,
	}
}