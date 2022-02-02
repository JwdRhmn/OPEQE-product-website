import produce from 'immer';

import {
	DATA_FETCH_FULFILLED,
	VERIFY_USER_EMAIL,
} from "../../config/actionNames";

import dataFetchStatusReducer ,{ initialFetchStatus } from "../helpers/dataFetchStatus";

export const initialState = {
	status: initialFetchStatus,
	data: {},
}


export default (state=initialState, action) => { 

	const { 
        status,
    } = state;

	const verifyEmailStatus = dataFetchStatusReducer(status, action, VERIFY_USER_EMAIL);

	return produce(state, finalState => {
        finalState.status = verifyEmailStatus;
        
        const { type, payload } = action;
	
		switch(type){
			// FETCH REWARDS
			case `${VERIFY_USER_EMAIL}${DATA_FETCH_FULFILLED}` :{
				finalState.data = payload;
				break;
			}			
			default: {
				break;
			}
		}

		return finalState;
    })    

}