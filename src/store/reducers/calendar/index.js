import produce from "immer";

import eventsReducer from "./eventsReducer";



const initialState = {}

export default (state=initialState, action) => {
    
    const {
        events,
    } = state;

    const eventsReduced = eventsReducer(events, action);

    return produce(state, finalState => {
        finalState.events = eventsReduced;
    })
}

