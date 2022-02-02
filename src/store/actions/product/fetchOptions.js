import { FETCH_PRODUCT_ITEM_OPTIONS } from "../../config/actionNames";
import getProductOptions from "../../../api/product/getProductOptions";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";

export default id => (dispatch, getState) => {
	const dataForAPI = {
		id: id,
	}

	const dataForStore = id;

	dispatch(
		addToQueue(
			{
				type: [ FETCH_PRODUCT_ITEM_OPTIONS ],
				payload: dataForStore
			},
			getProductOptions(
				addAuth(dataForAPI, getState())
			),
			{
				retry: true,
			}
		)
	);
}