import { FETCH_USER_PAYMENT_METHODS } from "../../config/actionNames";
import fetchPaymentMethodsAPI from "../../../api/user/fetchPaymentMethods";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";

export default data => (dispatch, getState) => {
	dispatch(
		addToQueue(
			{
				type: [ FETCH_USER_PAYMENT_METHODS ],
			},
			fetchPaymentMethodsAPI(
				addAuth(data, getState())
			)
		)
	);
}