import produce from "immer";

import dataFetchStatusReducer, { initialFetchStatus } from "../helpers/dataFetchStatus";
import {
    CHECK_IF_EMAIL_IS_DEMO,
} from "../../config/actionNames/";

export const initialState = {
    status: initialFetchStatus,
}

export default (state=initialState, action) => { 

	const { 
        status 
    } = state;

	const checkEmailStatus = dataFetchStatusReducer(status, action, CHECK_IF_EMAIL_IS_DEMO);

    return produce(state, finalState => {
        finalState.status = checkEmailStatus;

        const { type, payload } = action;

		switch(type){
			default: {
                break;
            }	
		}	

        return finalState;
    })    
};

