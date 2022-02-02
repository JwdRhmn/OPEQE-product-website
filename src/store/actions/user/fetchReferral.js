import { FETCH_USER_REFERRAL } from "../../config/actionNames";
import fetchReferral from "../../../api/user/fetchReferral";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";


export default () => (dispatch, getState) => {
	const state = getState();

	const dataForAPI = {}

	dispatch(
		addToQueue(
			{
				type: [ FETCH_USER_REFERRAL ],
			},
			fetchReferral(
				addAuth(dataForAPI, state)
			)
		)
	);
}


