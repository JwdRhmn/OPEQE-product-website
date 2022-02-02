import { CANCEL_RESERVE } from "../../config/actionNames";
import cancelReserve from "../../../api/reserve/cancelReserve";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";

export default id => (dispatch, getState) => {
	const data = {
		id,
	}

	dispatch(
		addToQueue(
			{
				type: [ CANCEL_RESERVE ],
				payload: data,
			},
			cancelReserve(
				addAuth(data, getState())
			)
		)
	)
}