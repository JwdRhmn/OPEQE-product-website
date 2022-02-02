import { SET_ACCOUNT_BAN } from "../../config/actionNames";

export default (target, isBanned) => ({
	type: SET_ACCOUNT_BAN,
	payload: {
		target: target,
		isBanned: isBanned
	}
})


