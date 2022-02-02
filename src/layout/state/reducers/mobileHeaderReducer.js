import produce from "immer";

import { SET_APP_MOBILE_HEADER } from "../config/actionNames/";

export const initialState = {
    middle: {
        main: "",
        sub: "",
        onClick: null
    },
    end: {
        main: '',
    }
};

export default (state = initialState, action) => {
    return produce(state, finalState => {
        const { type, payload } = action;

        switch (type) {
            case SET_APP_MOBILE_HEADER: {
                for (const key1 in payload) {
                    const thisProp = payload[key1];
                    if (typeof thisProp === "object") {
                        for (const key2 in thisProp) {
                            finalState[key1][key2] = thisProp[key2];
                        }
                    } else {
                        finalState[key1] = thisProp;
                    }
                }
                break;
            }
        }

        return finalState;
    });
};
