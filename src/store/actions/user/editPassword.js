import { EDIT_USER_PASSWORD } from "../../config/actionNames";
import editPassword from "../../../api/user/editPassword";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";
import selectUserData from "../../selectors/user/selectUserData";


export default ({
	oldPass,
	newPass,
}) => (dispatch, getState) => {
	const state = getState();
	const userData = selectUserData(state).data;

	const dataForAPI = {
		number: userData.mobileNumber,
		old: oldPass,
		new: newPass,
		type: "isPassword",
		verification: '',
	}

	dispatch(
		addToQueue(
			{
				type: [ EDIT_USER_PASSWORD ],
			},
			editPassword(
				addAuth(dataForAPI, state)
			)
		)
	);
}


