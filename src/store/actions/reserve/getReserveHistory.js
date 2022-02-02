import { FETCH_RESERVE_HISTORY } from "../../config/actionNames";
import getReserveHistory from "../../../api/reserve/getHistory";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";

export default () => (dispatch, getState) => {
	dispatch(
		addToQueue(
			{
				type: [ FETCH_RESERVE_HISTORY ],
			},
			getReserveHistory(
				addAuth({}, getState())
			)
		)
	)
}