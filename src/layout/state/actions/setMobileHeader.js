import { SET_APP_MOBILE_HEADER } from "../config/actionNames";

export default headerProps => {
	return {
		type: SET_APP_MOBILE_HEADER,
		payload: headerProps,
	}
}