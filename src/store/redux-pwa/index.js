import { createStore } from "redux";

import { loadStore } from "./persist/";
import subscribe from "./subscribe/";
import addEventListeners from "./listeners/";
import addToQueue from "./actions/addToQueue";
import reducer from "./reducer";
import { APP_STARTED as APP_START_ACTION_NAME } from "./config";

const storeCreator = ({
    renderFunction,
    initialState,
    reducers,
    middlewares,
    version,
    callBack
}) => {
    const store = createStore(reducers, initialState, middlewares);
    if (callBack) {
        callBack(store);
    }

    subscribe(store);
    addEventListeners(store.dispatch);

    renderFunction(store);
};

const createOfflineStore = (reducers, middlewares, callBack) => (
    renderFunction,
    version
) => {
    loadStore(version, initialState => {
        storeCreator({
            renderFunction,
            initialState,
            reducers,
            middlewares,
            version,
            callBack
        });
    });
};

export default createOfflineStore;
export { addToQueue, reducer, APP_START_ACTION_NAME };
