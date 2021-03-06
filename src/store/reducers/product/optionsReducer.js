import produce from "immer";

import dataFetchStatusReducer, { initialFetchStatus } from "../helpers/dataFetchStatus";
import {
    FETCH_PRODUCT_ITEM_OPTIONS,
    DATA_FETCH_FULFILLED,
} from "../../config/actionNames/";

export const initialState = {
    status: initialFetchStatus,
    data: {},
}

export default (state=initialState, action) => { 

    const { 
        status 
    } = state;

	const optionsFetchStatus = dataFetchStatusReducer(status, action, FETCH_PRODUCT_ITEM_OPTIONS);

    return produce(state, finalState => {
        finalState.status = optionsFetchStatus;
        
        const { type, payload, meta } = action;

		switch(type){
			case `${FETCH_PRODUCT_ITEM_OPTIONS}${DATA_FETCH_FULFILLED}` :{
				finalState.data[meta] = payload;
				break;
			}		
		}	

        return finalState;
    })    
};

                