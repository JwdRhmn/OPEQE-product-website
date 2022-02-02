import { CHECK_IF_EMAIL_IS_DEMO } from "../../config/actionNames";
import checkIfEmailIsDemo from "../../../api/demo/checkIfEmailIsDemo";
import { addToQueue } from "../../redux-pwa";


export default ({
	email
}) => (dispatch, getState) => {

	const dataForAPI = {
		Email: email,
	}

	dispatch(
		addToQueue(
			{
				type: [ CHECK_IF_EMAIL_IS_DEMO ],
			},
			checkIfEmailIsDemo(
				dataForAPI
			)
		)
	);
}


