import produce from "immer";

import detailsReducer from "./detailsReducer";



const initialState = {}

export default (state=initialState, action) => {
    
    const {
        details,
    } = state;

    const detailsReduced = detailsReducer(details, action);

    return produce(state, finalState => {
        finalState.details = detailsReduced;
    })
}

