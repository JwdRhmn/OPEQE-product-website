import { FETCH_PRODUCT_ITEM_DATA } from "../../config/actionNames";
import getProductById from "../../../api/product/getProductById";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";

export default data => (dispatch, getState) => {
	dispatch(
		addToQueue(
			{
				type: [ FETCH_PRODUCT_ITEM_DATA ],
			},
			getProductById(
				addAuth(data, getState())
			),
			{
				retry: true,
			}
		)
	);
}