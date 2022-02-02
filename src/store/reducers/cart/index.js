import produce from "immer";

import detailsReducer from "./detailsReducer";
import checkoutReducer from "./checkoutReducer";
import historyReducer from "./historyReducer";
import cancelReducer from "./cancelReducer";

const initialState = {}

export default (state=initialState, action) => {
    
    const {
        details,
        checkOut,
        history,
        cancelOrder,
    } = state;

    const detailsReduced = detailsReducer(details, action);
    const checkOutReduced = checkoutReducer(checkOut, action);
    const historyReduced = historyReducer(history, action);
    const cancelReduced = cancelReducer(cancelOrder, action);


    return produce(state, finalState => {
        finalState.details = detailsReduced;
        finalState.checkOut = checkOutReduced;
        finalState.history = historyReduced;
        finalState.cancelOrder = cancelReduced;
    })
}

