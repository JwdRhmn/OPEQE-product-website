import { CANCEL_ORDER } from "../../config/actionNames";
import cancelOrder from "../../../api/cart/cancelOrder";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";

export default id => (dispatch, getState) => {
	const dataForAPI = {
		orderId: id,
	}

	const dataForStore = {
		id,
	}

	dispatch(
		addToQueue(
			{
				type: [ CANCEL_ORDER ],
				payload: dataForStore,
			},
			cancelOrder(
				addAuth(dataForAPI, getState())
			)
		)
	)
}