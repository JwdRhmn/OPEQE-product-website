import { SET_USER_DELIVERY_CONDITION } from "../../config/actionNames";

export default data => {
	return {
		type: SET_USER_DELIVERY_CONDITION,
		payload: data,
	};
}


