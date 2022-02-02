import produce from "immer";

import dataFetchStatusReducer, { initialFetchStatus } from "../helpers/dataFetchStatus";
import {
    CANCEL_ORDER,
    DATA_FETCH_FULFILLED,
} from "../../config/actionNames/";

export const initialState = {
    status: initialFetchStatus,
    data: {}
}

export default (state=initialState, action) => { 

	const { 
        status,
    } = state;

	const cancelOrderStatus = dataFetchStatusReducer(status, action, CANCEL_ORDER);

    return produce(state, finalState => {
        finalState.status = cancelOrderStatus;

        const { type, payload } = action;

		switch(type){
			case `${CANCEL_ORDER}${DATA_FETCH_FULFILLED}`: {
				finalState.data = payload;
				break;
			}
			default: {
				break;
			} 
		}	

		return finalState;
    })    
};

