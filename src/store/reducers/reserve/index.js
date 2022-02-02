import produce from "immer";

import historyReducer from "./historyReducer";
import addReducer from "./addReducer";
import cancelReducer from "./cancelReducer";
import checkAvailabilityReducer from "./checkAvailabilityReducer";

const initialState = {}

export default (state=initialState, action) => {
    
    const {
        history,
        add,
        cancel,
        availability,
    } = state;

    const historyReduced = historyReducer(history, action);
    const addReduced = addReducer(add, action);
    const cancelReduced = cancelReducer(cancel, action);
    const checkAvailabilityReduced = checkAvailabilityReducer(availability, action);

    return produce(state, finalState => {
        finalState.history = historyReduced;
        finalState.add = addReduced;
        finalState.cancel = cancelReduced;
        finalState.availability = checkAvailabilityReduced;
    })
}