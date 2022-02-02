import { FETCH_PRODUCT_ITEMS } from "../../config/actionNames";
import getProductAPI from "../../../api/product/getProduct";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";
import getUserDefaultAddress from "../../selectors/user/getUserDefaultAddress";

export default data => (dispatch, getState) => {
	const state = getState();
	const address = getUserDefaultAddress(state);

	const addressData = address ? {
		latitude: address.latitude,
		longitude: address.longitude,
	} : {}

	const dataWithAddress = {
		...data,	
		...addressData,	
	}
	dispatch(
		addToQueue(
			{
				type: [ FETCH_PRODUCT_ITEMS ],
			},
			getProductAPI(
				addAuth(dataWithAddress, getState())
			),
			{
				retry: true,
			}
		)
	);	
}