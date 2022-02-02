import produce from "immer";

import dataFetchStatusReducer, { initialFetchStatus } from "../helpers/dataFetchStatus";
import {
    USER_LOGIN,
    USER_SIGNUP,
    USER_LOGOUT,    
    EDIT_USER_NAME,
    DATA_FETCH_FULFILLED,
    DATA_FETCH_REJECTED,
    EDIT_USER_EMAIL
} from "../../config/actionNames/";

export const initialState = {
    status: initialFetchStatus,
    data: {},
    error: null,
}

export default (state=initialState, action) => { 

    const { 
        status 
    } = state;

	let userInfoFetchStatus = dataFetchStatusReducer(status, action, USER_LOGIN);
    userInfoFetchStatus = dataFetchStatusReducer(userInfoFetchStatus, action, USER_SIGNUP);

    return produce(state, finalState => {
        finalState.status = userInfoFetchStatus;
        
        const { type, payload, meta } = action;

		switch(type){
            // GET DATA
			case `${USER_LOGIN}${DATA_FETCH_FULFILLED}`: {
				finalState.data = payload;
				break;
			}	
            case `${USER_SIGNUP}${DATA_FETCH_FULFILLED}`: {
                finalState.data = payload;
                break;
            }   
            case `${USER_LOGIN}${DATA_FETCH_REJECTED}`: {
                finalState.error = payload.status;
                break;
            }   
            case `${USER_SIGNUP}${DATA_FETCH_REJECTED}`: {
                finalState.error = payload.status;
                break;
            }   
            //EDIT NAMES
            case `${EDIT_USER_NAME}${DATA_FETCH_FULFILLED}`: {
                if(payload.isSucceeded){
                    if(meta.nameType === 'first'){
                        finalState.data.firstName = meta.newName;
                    } else {
                        finalState.data.lastName = meta.newName;
                    }
                }
                break;
            }
            //EDIT EMAIL
            case `${EDIT_USER_EMAIL}${DATA_FETCH_FULFILLED}`: {
                if(payload.isSucceeded){
                    finalState.data.email = payload.value;
                }
                break;
            }
            // RESET DATA
            case USER_LOGOUT: {
                finalState = initialState;
                break;
            }   	
		}	

        return finalState;
    })    
};

