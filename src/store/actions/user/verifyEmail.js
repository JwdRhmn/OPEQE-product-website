import { VERIFY_USER_EMAIL } from "../../config/actionNames";
import verifyEmail from "../../../api/user/verifyEmail";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";
import selectUserData from "../../selectors/user/selectUserData";


export default ({
	email,
}) => (dispatch, getState) => {
	const state = getState();
	const userData = selectUserData(state).data;

	const dataForAPI = {
		number: userData.mobileNumber,
		old: userData.email,
		new: email,
		type: "isEmail",
		verification: '',
	}

	dispatch(
		addToQueue(
			{
				type: [ VERIFY_USER_EMAIL ],
			},
			verifyEmail(
				addAuth(dataForAPI, state)
			)
		)
	);
}


