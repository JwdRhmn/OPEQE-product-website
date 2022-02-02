import produce from "immer";

import dataFetchStatusReducer, { initialFetchStatus } from "../helpers/dataFetchStatus";
import {
    DATA_FETCH_FULFILLED,
    CHECK_RESRVE_AVAILABILITY,
} from "../../config/actionNames/";

export const initialState = {
    status: initialFetchStatus,
    data: {},
}

export default (state=initialState, action) => { 

	const { 
        status 
    } = state;

	const checkAvailabilityStatus = dataFetchStatusReducer(status, action, CHECK_RESRVE_AVAILABILITY);

    return produce(state, finalState => {
        finalState.status = checkAvailabilityStatus;

        const { type, payload } = action;

		switch(type){
			case `${CHECK_RESRVE_AVAILABILITY}${DATA_FETCH_FULFILLED}`: {
				finalState.data = payload;
				break;
			}
		}	

        return finalState;
    })    
};

