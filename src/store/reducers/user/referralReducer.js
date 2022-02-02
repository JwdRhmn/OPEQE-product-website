import produce from 'immer';

import {
	DATA_FETCH_FULFILLED,
	FETCH_USER_REFERRAL,
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

	const referralFetchStatus = dataFetchStatusReducer(status, action, FETCH_USER_REFERRAL);

	return produce(state, finalState => {
        finalState.status = referralFetchStatus;
        
        const { type, payload } = action;
	
		switch(type){
			// FETCH REFERRALS
			case `${FETCH_USER_REFERRAL}${DATA_FETCH_FULFILLED}` :{
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