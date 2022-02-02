import { REMOVE_ITEM_FROM_CART } from "../../config/actionNames";

export default key => {
	return {
		type: REMOVE_ITEM_FROM_CART,
		payload: key,		
	};
}