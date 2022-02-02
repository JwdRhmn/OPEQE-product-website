import { SET_NOTIFICATION_INSTANCE_TOKEN } from "../../config/actionNames";

export default token => ({
	type: SET_NOTIFICATION_INSTANCE_TOKEN,
	payload: token
})