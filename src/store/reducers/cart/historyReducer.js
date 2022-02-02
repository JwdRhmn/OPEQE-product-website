import produce from "immer";

import dataFetchStatusReducer, { initialFetchStatus } from "../helpers/dataFetchStatus";
import {
    FETCH_USER_ORDER_HISTORY,
    CANCEL_ORDER,
    DATA_FETCH_FULFILLED,
} from "../../config/actionNames/";

export const initialState = {
    status: initialFetchStatus,
    list: [],
}

export default (state=initialState, action) => { 

	const { 
        status 
    } = state;

	const historyFetchStatus = dataFetchStatusReducer(status, action, FETCH_USER_ORDER_HISTORY);

    return produce(state, finalState => {
        finalState.status = historyFetchStatus;

        const { type, payload, meta } = action;

		switch(type){
            // FETCH
			case `${FETCH_USER_ORDER_HISTORY}${DATA_FETCH_FULFILLED}`: {
				finalState.list = payload;
				break;
			}
			// CANCEL
			case `${CANCEL_ORDER}${DATA_FETCH_FULFILLED}` :{
                finalState.list.splice(
                    finalState.list.findIndex(
                        item => item.id === meta.id
                    )
                , 1);
                break;
            }   
			default: {
				break;
			} 
		}	

		return finalState;
    })    
};

