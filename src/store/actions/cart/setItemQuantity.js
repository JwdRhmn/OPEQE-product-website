import { SET_CART_ITEM_QUANTITY } from "../../config/actionNames";

export default (key, quantity)=> ({
	type: SET_CART_ITEM_QUANTITY,
	payload: {
		key,
		quantity
	}
})