import produce from "immer";

import addToCart from "./functions/addToCart";
import removeFromCart from "./functions/removeFromCart";
import setItemQuantity from "./functions/setItemQuantity";
import {
	ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    DATA_FETCH_FULFILLED,
    SUBMIT_SHOPPING_CART,
    CLEAR_SHOPPING_CART,
    SET_CART_ITEM_QUANTITY
} from "../../config/actionNames/";

export const initialState = {
    id: null,    
    rewards: [],
    items: [],
    orderCondition: {},
    orderNote: null,
    gratuity: 0,
    deliveryGratuity: 0,
    date: null,
    delivery: {
        fee: 0,
        time: 0,
    }
}

export default (state=initialState, action) => { 
	const { type, payload } = action;

	switch(type){
		case ADD_ITEM_TO_CART :{
			return addToCart(state, payload);
			break;
		}	
        case REMOVE_ITEM_FROM_CART: {
            return removeFromCart(state, payload);
            break;
        }
        case SET_CART_ITEM_QUANTITY: {
            return setItemQuantity(state, payload);
            break;
        }
        case CLEAR_SHOPPING_CART: {
            return initialState;
            break;
        }
        case `${SUBMIT_SHOPPING_CART}${DATA_FETCH_FULFILLED}`: {
            return initialState;
            break;
        }
        default:{
            return state;
            break;
        }	
	}	

    return state;
};

