import produce from 'immer';

import {
	DATA_FETCH_FULFILLED,
	DATA_FETCH_PENDING,
	FETCH_USER_PAYMENT_METHODS,
	ADD_USER_PAYMENT_METHOD,
	EDIT_USER_PAYMENT_METHOD,
} from "../../config/actionNames";

import dataFetchStatusReducer ,{ initialFetchStatus } from "../helpers/dataFetchStatus";

export const initialState = {
	get:{
		status: initialFetchStatus,
		list: [],
	},
	add:{
		status: initialFetchStatus,
	},
}


export default (state=initialState, action) => { 

	const { 
        get: {
        	status: getStatus,
        },
        add: {
        	status: addStatus,
        }
    } = state;

	const paymentMethodsFetchStatus = dataFetchStatusReducer(getStatus, action, FETCH_USER_PAYMENT_METHODS);
	const paymentMethodsAddStatus = dataFetchStatusReducer(addStatus, action, ADD_USER_PAYMENT_METHOD);

	return produce(state, finalState => {
        finalState.get.status = paymentMethodsFetchStatus;
        finalState.add.status = paymentMethodsAddStatus;
        
        const { type, payload, meta } = action;
	
		switch(type){
			// GET METHODS
			case `${FETCH_USER_PAYMENT_METHODS}${DATA_FETCH_FULFILLED}` :{
				finalState.get.list = payload;
				break;
			}
			// ADD Method
			case `${ADD_USER_PAYMENT_METHOD}${DATA_FETCH_FULFILLED}` : {
				let list = finalState.get.list;
				const index = list.findIndex(item => item.id === meta.id);
				if(index === -1){
					list = list.map(item => ({
						...item,
						isDefault: false,
					}));
					list.push(meta);
				}
				finalState.get.list = list;
				break;
			}
			// EDIT Method
			case `${EDIT_USER_PAYMENT_METHOD}${DATA_FETCH_PENDING}` : {
				let list = finalState.get.list;
				const index = list.findIndex(item => item.id === meta.id);
				if(index !== -1){				
					if(meta.isDelete){
						list.splice(index, 1);
					} else {
						list = list.map(item => ({
							...item,
							isDefault: false,
						}));
						list[index].isDefault = true;
					}
				}
				finalState.get.list = list;
				break;
			}
			default: {
				break;
			}
		}

		return finalState;
    })    

}