import produce from "immer";

import {
    SET_NOTIFICATION_INSTANCE_TOKEN,
    SET_NOTIFICATION_INSTANCE_TOKEN_SENT_TO_SERVER,
} from "../../config/actionNames/";

export const initialState = {
    token: null,
    isSentToServer: false,
}

export default (state=initialState, action) => { 


    return produce(state, finalState => {

        const { type, payload } = action;

		switch(type){
            case SET_NOTIFICATION_INSTANCE_TOKEN: {
                finalState.token = payload;
                break;
            }
            case SET_NOTIFICATION_INSTANCE_TOKEN_SENT_TO_SERVER: {
                finalState.isSentToServer = payload;
                break;
            }
			default: {
                break;
            }	
		}	

        return finalState;
    })    
};

