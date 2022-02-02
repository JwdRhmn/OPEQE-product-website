import { FETCH_USER_ORDER_HISTORY } from "../../config/actionNames";
import fetchOrderHistory from "../../../api/cart/fetchHistory";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";

export default () => (dispatch, getState) => {
	dispatch(
		addToQueue(
			{
				type: [ FETCH_USER_ORDER_HISTORY ],
			},
			fetchOrderHistory(
				addAuth({}, getState())
			)
		)
	)
}