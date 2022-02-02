import { FETCH_USER_REWARDS } from "../../config/actionNames";
import fetchRewards from "../../../api/user/fetchRewards";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";
import getUserDefaultAddress from "../../selectors/user/getUserDefaultAddress";

export default data => (dispatch, getState) => {
	const state = getState();

	const address = getUserDefaultAddress(state);

	const dataForAPI = {
		Latitude: address ? address.latitude : 0,
		Longitude: address ? address.longitude : 0,
		Altitude: 0,
	}

	dispatch(
		addToQueue(
			{
				type: [ FETCH_USER_REWARDS ],
			},
			fetchRewards(
				addAuth(dataForAPI, state)
			)
		)
	);
}