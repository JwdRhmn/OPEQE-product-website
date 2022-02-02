import { EDIT_USER_PAYMENT_METHOD } from "../../config/actionNames";
import editPaymentMethod from "../../../api/user/editPaymentMethod";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";

export default ({
	id, 
	remove
}) => (dispatch, getState) => { 

	const dataForAPI = {
		id: id,
	    isDelete: remove,
	}

	const dataForUI = {
		id: id,
		isDelete: remove,
	}

	dispatch(
		addToQueue(
			{
				type: [ EDIT_USER_PAYMENT_METHOD ],
				payload: dataForUI,
			},
			editPaymentMethod(
				addAuth(dataForAPI, getState())
			)
		)
	);
}
