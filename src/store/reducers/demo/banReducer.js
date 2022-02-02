import produce from "immer";

import {
    SET_ACCOUNT_BAN,
    FETCH_PRODUCT_ITEMS,
    DATA_FETCH_REJECTED,
    FETCH_RESERVE_HISTORY
} from "../../config/actionNames/";

export const initialState = {
    user: false,
    store: false,
}

export default (state=initialState, action) => { 

    return produce(state, finalState => {
        const { type, payload } = action;

		switch(type){
            case SET_ACCOUNT_BAN: {
                if(payload.target === 'store'){
                    finalState.store = payload.isBanned;
                } else {
                    finalState.user = payload.isBanned;
                }
                break;
            }
            case `${FETCH_PRODUCT_ITEMS}${DATA_FETCH_REJECTED}`: {
                if(payload && payload.status){
                    if(payload.status === 205){
                        finalState.store = true;
                    }
                    if(payload.status === 206){
                        finalState.user = true;
                    }
                }
                break;
            }
            case `${FETCH_RESERVE_HISTORY}${DATA_FETCH_REJECTED}`: {
                if(payload && payload.status){
                    if(payload.status === 205){
                        finalState.store = true;
                    }
                    if(payload.status === 206){
                        finalState.user = true;
                    }
                }
                break;
            }
			default: {
                break;
            }	
		}	

        return finalState;
    })    
};

