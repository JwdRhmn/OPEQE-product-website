import produce from "immer";

import dataFetchStatusReducer, { initialFetchStatus } from "../helpers/dataFetchStatus";
import {
    DATA_FETCH_FULFILLED,
    ADD_RESERVE,
} from "../../config/actionNames/";

export const initialState = {
    status: initialFetchStatus,
    data: {},
}

export default (state=initialState, action) => { 

	const { 
        status 
    } = state;

	const addStatus = dataFetchStatusReducer(status, action, ADD_RESERVE);

    return produce(state, finalState => {
        finalState.status = addStatus;

        const { type, payload } = action;

		switch(type){
			case `${ADD_RESERVE}${DATA_FETCH_FULFILLED}`: {
				finalState.data = payload;
				break;
			}
		}	

        return finalState;
    })    
};

