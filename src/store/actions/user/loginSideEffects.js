import fetchPaymentMethods from "./fetchPaymentMethods";
import { refreshFCMToken } from "../../../firebase";

export default () => (dispatch, getState) => {
	fetchPaymentMethods()(dispatch, getState);

	//refreshFCMToken();
}