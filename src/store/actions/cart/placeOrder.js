import produce from "immer";

import {
	SUBMIT_SHOPPING_CART
} from "../../config/actionNames";
import submitCart from "../../../api/cart/submitCart";
import formatDate from "../../../api/functions/formatData";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";
import uuid from "../../../functions/uuid";
import getDate from "../../../functions/formattedDate";
import getCheckOutData from "../../selectors/cart/getCheckOutData";
import getDeliveryData from "../../selectors/user/getDeliveryData";
import selectDefaultPaymentMethod from "../../selectors/user/selectDefaultPaymentMethod";


export default  note => async (dispatch, getState) => {

	const state = getState();

	const checkoutData = getCheckOutData(state);
	const deliveryData = getDeliveryData(state);
	const defaultPayment = selectDefaultPaymentMethod(state);

	const checkOut = produce({}, draft => {
		draft.data = checkoutData;
		draft.data.fee = checkoutData.fees;
		delete draft.data.fees;


		draft.data.id = uuid();
	    draft.data.paymentId = defaultPayment.id;
	    draft.data.note = note;
	    draft.data.gratuity = 0;
	    draft.data.date = cerateFormattedDate();
		draft.data.note = note;
		draft.data.delivery = deliveryData;

	}); 



	dispatch( addToQueue(
		{
			type: [ SUBMIT_SHOPPING_CART ],
		},
		submitCart(
			addAuth(checkOut, state)
		)		
	));	
}



const cerateFormattedDate = () => {
  	const {
	    hour12,
	    minute,
	    year,
	    monthName,
	    meridiem,
	    day,
  	} = getDate();

  	return formatDate({
		monthName,
		day,
		year,
		hour12,
		minute,
		meridiem
	});
}