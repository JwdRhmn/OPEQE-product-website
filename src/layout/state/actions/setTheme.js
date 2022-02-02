import { SET_APP_CURRENT_THEME } from "../config/actionNames";

export default theme => {
	return {
		type: SET_APP_CURRENT_THEME,
		payload: theme,
	}
}