import produce from 'immer';

import {
	EDIT_USER_NAME,
	EDIT_USER_PASSWORD,
	EDIT_USER_EMAIL,
	DATA_FETCH_FULFILLED,
} from "../../config/actionNames";

import dataFetchStatusReducer ,{ initialFetchStatus } from "../helpers/dataFetchStatus";

export const initialState = {
	names:{
		status: initialFetchStatus,
	},
	password: {
    	status: initialFetchStatus,
    	data: {}
    },
    email: {
    	status: initialFetchStatus,
    	data: {}
    },
}


export default (state=initialState, action) => { 

	const { 
        names: {
        	status: namesStatus,
        },
        password: {
        	status: passStatus,
        },
        email: {
        	status: emailStatus,
        },
    } = state;

	const editNamesStatus = dataFetchStatusReducer(namesStatus, action, EDIT_USER_NAME);
	const editPassStatus = dataFetchStatusReducer(passStatus, action, EDIT_USER_PASSWORD);
	const editEmailStatus = dataFetchStatusReducer(emailStatus, action, EDIT_USER_EMAIL);

	return produce(state, finalState => {
        finalState.names.status = editNamesStatus;
        finalState.password.status = editPassStatus;
        finalState.email.status = editEmailStatus;
        
        const { type, payload, meta } = action;
	
		switch(type){
			// EDIT PASSWORD RESPONSE
			case `${EDIT_USER_PASSWORD}${DATA_FETCH_FULFILLED}` :{
				finalState.password.data = payload ? payload : {};
				break;
			}
			//EDIT EMAIL RESPONSE
			case `${EDIT_USER_EMAIL}${DATA_FETCH_FULFILLED}` :{
				finalState.email.data = payload ? payload : {};
				break;
			}
			default: {
				break;
			}
		}

		return finalState;
    })    

}