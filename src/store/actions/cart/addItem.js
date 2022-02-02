import { ADD_ITEM_TO_CART } from "../../config/actionNames";
import getProductItemData from "../../selectors/product/getProductItemData";
import uuid from "../../../functions/uuid";

export default ({
	id,
	count,
	options,
	note,
	selectionArray,
	subscription
}) => (dispatch, getState) => {
	const itemData = getProductItemData()( 
		getState(),  
		{ itemId: id}
	);

	dispatch(
		{
			type: ADD_ITEM_TO_CART,
			payload: {
				id: itemData.data.id,
				key: uuid(),
	            title: itemData.data.title,
	            quantity: count,
	            note: note,
	            price: itemData.data.price,
	            total: itemData.data.price * count,
	            fee: itemData.deliveryFee,
	            image: itemData.data.image,
	            preparation: itemData.data.preparation,
	            options: options,
	            rewards: itemData.rewards,
	            deliveryTime: itemData.data.deliveryTime,
	            special: itemData.data.special,
	            indexes: selectionArray,
	            subscription: subscription && {
	            	id: subscription.id,
					timePriod: subscription.every,
					deliveryDay: subscription.day,
					deliveryTime: subscription.time,
	            }
			},		
		}
	);
}