import { EDIT_USER_EMAIL } from "../../config/actionNames";
import editEmail from "../../../api/user/editEmail";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";
import selectUserData from "../../selectors/user/selectUserData";


export default ({
	email,
	code,
}) => (dispatch, getState) => {
	const state = getState();
	const userData = selectUserData(state).data;

	const dataForAPI = {
		number: userData.mobileNumber,
		old: userData.email,
		new: email,
		type: "isEmail",
		verification: code,
	}

	dispatch(
		addToQueue(
			{
				type: [ EDIT_USER_EMAIL ],
			},
			editEmail(
				addAuth(dataForAPI, state)
			)
		)
	);
}


