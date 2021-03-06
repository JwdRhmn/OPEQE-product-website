import produce from "immer";

import dataFetchStatusReducer, { initialFetchStatus } from "../helpers/dataFetchStatus";
import {
    FETCH_PRODUCT_ITEMS,
    DATA_FETCH_FULFILLED
} from "../../config/actionNames/";

export const initialState = {
    status: initialFetchStatus,
    data: {},
}

export default (state=initialState, action) => { 

    const { 
        status 
    } = state;

	const productItemsFetchStatus = dataFetchStatusReducer(status, action, FETCH_PRODUCT_ITEMS);

    return produce(state, finalState => {
        finalState.status = productItemsFetchStatus;
        
        const { type, payload, meta } = action;

		switch(type){
            // FETCH PRODUCT
			case `${FETCH_PRODUCT_ITEMS}${DATA_FETCH_FULFILLED}`: {
				finalState.data = payload;
				break;
			}   
		}	

        return finalState;
    })    
};

                