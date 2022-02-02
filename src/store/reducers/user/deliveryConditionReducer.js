import produce from 'immer';

import {
	SET_USER_DELIVERY_CONDITION,
	SUBMIT_SHOPPING_CART,
	DATA_FETCH_FULFILLED
} from "../../config/actionNames";

export const initialState = {
	type: 'pickup',
	schedule: null,
	reserve: null,
};

export default produce( (state=initialState, action) => {
	const { type, payload } = action;

	switch(type){
		case SET_USER_DELIVERY_CONDITION : {
			state = {
				...state,
				...payload
			};
			if(payload && payload.type === 'reserve'){
				state.schedule = initialState.schedule;
			} else {
				state.reserve = initialState.reserve;
			}
			break;
		}
		case `${SUBMIT_SHOPPING_CART}${DATA_FETCH_FULFILLED}` : {
			state = initialState;
			break;
		}
		default: {
			break;
		}
	}

	return state;
});