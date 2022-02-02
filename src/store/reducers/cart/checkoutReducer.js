import produce from "immer";

import dataFetchStatusReducer, { initialFetchStatus } from "../helpers/dataFetchStatus";
import {
    SUBMIT_SHOPPING_CART
} from "../../config/actionNames/";

export const initialState = {
    status: initialFetchStatus,
}

export default (state=initialState, action) => { 

	const { 
        status 
    } = state;

	const checkoutDataFetchStatus = dataFetchStatusReducer(status, action, SUBMIT_SHOPPING_CART);

    return produce(state, finalState => {
        finalState.status = checkoutDataFetchStatus;
    })    
};

