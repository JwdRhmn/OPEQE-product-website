import produce from "immer";

import dataFetchStatusReducer, {
    initialFetchStatus
} from "../helpers/dataFetchStatus";
import {
    FETCH_RESERVE_HISTORY,
    DATA_FETCH_FULFILLED,
    CANCEL_RESERVE
} from "../../config/actionNames/";

export const initialState = {
    status: initialFetchStatus,
    list: []
};

export default (state = initialState, action) => {
    const { status } = state;

    const historyFetchStatus = dataFetchStatusReducer(
        status,
        action,
        FETCH_RESERVE_HISTORY
    );

    return produce(state, finalState => {
        finalState.status = historyFetchStatus;

        const { type, payload, meta } = action;

        switch (type) {
            // FETCH
            case `${FETCH_RESERVE_HISTORY}${DATA_FETCH_FULFILLED}`: {
                finalState.list = payload;
                break;
            }
            // CANCEL RESERVE
            case `${CANCEL_RESERVE}${DATA_FETCH_FULFILLED}`: {
                finalState.list.splice(
                    finalState.list.findIndex(item => item.id === meta.id),
                    1
                );
                break;
            }
        }

        return finalState;
    });
};
