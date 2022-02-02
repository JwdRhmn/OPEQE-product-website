import { FETCH_USER_ADDRESS } from "../../config/actionNames";
import getUserAddressAPI from "../../../api/user/getUserAddress";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";

export default data => (dispatch, getState) => {
	dispatch(
		addToQueue(
			{
				type: [ FETCH_USER_ADDRESS ],
			},
			getUserAddressAPI(
				addAuth(data, getState())
			)
		)
	);
}