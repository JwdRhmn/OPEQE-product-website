import { 
	TOGGLE_PRODUCT_ITEM_FAVORITE,
	SET_USER_FAVORITE_PRODUCT_ITEMS,
} from "../../config/actionNames";
import addToFavorite from "../../../api/product/addToFavorite";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";
import selectFavoriteItemIds from "../../selectors/product/selectFavoriteItemIds";

export default id => (dispatch, getState) => {
	
	dispatch(
		{
			type: TOGGLE_PRODUCT_ITEM_FAVORITE,
			payload: id,
		}
	);
	
	const state = getState();

	const dataForAPI = {
		productId: selectFavoriteItemIds(state)
	};
	
	dispatch(
		addToQueue(
			{
				type: [ SET_USER_FAVORITE_PRODUCT_ITEMS ],
			},
			addToFavorite(
				addAuth(dataForAPI, state)
			),
			{
				retry: true,
				delay:{
					timeout: 5,
				}
			}
		)
	)
}

