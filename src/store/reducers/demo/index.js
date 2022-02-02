import produce from "immer";

import checkEmailReducer from "./checkEmailReducer";
import banReducer from "./banReducer";


const initialState = {}

export default (state=initialState, action) => {
    
    const {
        checkEmail,
        ban
    } = state;

    const checkEmailReduced = checkEmailReducer(checkEmail, action);
    const banReduced = banReducer(ban, action);

    return produce(state, finalState => {
        finalState.checkEmail = checkEmailReduced;
        finalState.ban = banReduced;
    })
}

