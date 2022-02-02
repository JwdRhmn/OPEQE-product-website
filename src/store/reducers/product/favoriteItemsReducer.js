import produce from "immer";

import dataFetchStatusReducer, {
    initialFetchStatus
} from "../helpers/dataFetchStatus";
import {
    SET_USER_FAVORITE_PRODUCT_ITEMS,
    TOGGLE_PRODUCT_ITEM_FAVORITE,
    FETCH_PRODUCT_ITEMS,
    DATA_FETCH_FULFILLED
} from "../../config/actionNames/";

export const initialState = {
    status: initialFetchStatus,
    data: {}
};

export default (state = initialState, action) => {
    const { status } = state;

    const setFavoritesStatus = dataFetchStatusReducer(
        status,
        action,
        SET_USER_FAVORITE_PRODUCT_ITEMS
    );

    return produce(state, finalState => {
        finalState.status = setFavoritesStatus;

        const { type, payload } = action;

        switch (type) {
            case TOGGLE_PRODUCT_ITEM_FAVORITE: {
                const favorites = finalState.data;
                if (favorites[payload]) {
                    delete favorites[payload];
                } else {
                    favorites[payload] = true;
                }
                break;
            }
            case `${FETCH_PRODUCT_ITEMS}${DATA_FETCH_FULFILLED}`: {
                finalState.data = {};
                const newItems = payload.items;
                newItems.forEach(item => {  
                    if(item.isFavorite){
                        finalState.data[item.id] = true;
                    }
                });
                break;
            }
        }

        return finalState;
    });
};
