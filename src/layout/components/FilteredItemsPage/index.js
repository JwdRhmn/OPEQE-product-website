import React, { useEffect, useState } from "react";
import cn from "classnames";
import { connect } from "react-redux";
import queryString from "query-string";

import FilteredItems from "../FilteredItems";
import GridList from "../GridList";


import isMobile from "../../../functions/isMobile";

import toggleFavorite from "../../../store/actions/product/toggleFavorite";
import selectUserData from "../../../store/selectors/user/selectUserData";
import selectGroupedProductItems from "../../../store/selectors/product/selectGroupedProductItems";
import {
    DATA_FETCH_PENDING,
    DATA_FETCH_FULFILLED,
    DATA_FETCH_REJECTED,
    DATA_FETCH_DATA_PROP
} from "../../../store/config/actionNames";

import {
    PRODUCT_PAGE_URL,
    ITEM_SEARCH_PAGE_URL
} from "../../config/routing";
import {
    ITEM_SEARCH_PAGE_TOP_PROMOTION_PROPS,
    HORIZONTAL_LIST_FRAME_SIZE,
    SEARCH_PAGE_FOOD_CARD_PROPS
} from "../../config/layout";

import Grid from "@material-ui/core/Grid";

import OrderOptionsBar from "../OrderOptionsBar";
import PageTopPromotion from "../PageTopPromotion";

import FoodCard from "./components/FoodCard";

import SpecialDetailsNotification from "../SpecialDetailsNotification";

export function Index(props) {
    const {
        className,
        style,
        status,
        productItems: {
            data: { groups: itemGroups, feeLabel, deliveryFee },
            status: {
                [DATA_FETCH_PENDING]: itemsLoading,
                [DATA_FETCH_REJECTED]: itemsError,
                [DATA_FETCH_FULFILLED]: itemsFetched
            }
        },
        user: { data: user },
        toggleFavorite,
        history,
        location,
        match,
        staticContext,
        ...others
    } = props;

    const breakpoints = {
        xs: 11,
        sm: 11,
        md: 11,
        lg: 11,
        xl: 11
    };

    const [showSpecialDetails, setShowSpecialDetails] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const { filterTypes, filterValue } = queryString.parse(location.search, {
        arrayFormat: "bracket"
    });

    const isSkeleton =
        (!itemGroups.length && (itemsLoading || itemsError)) ||
        !itemGroups.length;

    function itemlabelClick(item) {
        setSelectedItem(item);
        setShowSpecialDetails(true);
    }

    function handleSpecialUse() {
        setShowSpecialDetails(false);
        setTimeout(
            () =>
                history.push(
                    getItemHref({
                        id: selectedItem.id,
                        category: selectedItem.category.title,
                        manufacturer: selectedItem.manufacturer.title,
                        type: selectedItem.type.title
                    }, filterTypes, filterValue)
                ),
            400
        );
    }

    function handleFav(id, value) {
        toggleFavorite(id);
    }

    function mapItemData(data) {
        const href = getItemHref({
            id: data.id,
            category: data.category.title,
            manufacturer: data.manufacturer.title,
            type: data.type.title
        }, filterTypes, filterValue);

        const filterLinks = createFilterLinks(data);

        return {
            cardProps: {
                ...data,
                onLabelClick: () => itemlabelClick(data),
                onFav: handleFav,
                label: data.special.title,
                timeRemaining: data.special.remainingTime,
                href: href,
                id: data.id,
                hideFav: !user.token,
                bottomLabel: feeLabel,
                subTitle: data.feature.title,
                subTitleHref: filterLinks.sub,
                categoryHrefs: filterLinks.cat,
                layoutProps: SEARCH_PAGE_FOOD_CARD_PROPS
            }
        };
    }

    return (
        <>
            <SpecialDetailsNotification
                onUse={handleSpecialUse}
                title={selectedItem && selectedItem.special.title}
                description={selectedItem && selectedItem.special.description}
                img={selectedItem && selectedItem.image}
                open={showSpecialDetails}
                onClose={() => setShowSpecialDetails(false)}
            />
            <div
                className={cn("filtered-items-page-l1", { mobile: isMobile })}
                style={{
                    ...style
                }}
                {...others}
            >
                {!isMobile && (
                    <>
                        <PageTopPromotion
                            {...ITEM_SEARCH_PAGE_TOP_PROMOTION_PROPS}
                            itemHrefCreator={item => getItemHref(item, filterTypes, filterValue)}
                        />
                        <div className="plcaholder">&nbsp;</div>
                    </>
                )}
                <div className="page-body">
                    {!isMobile && (
                        <OrderOptionsBar itemBreakpoints={breakpoints} />
                    )}
                    <Grid className="page-content" container justify="center">
                        <Grid container item {...breakpoints}>
                            <FilteredItems
                                component={GridList}
                                childComponent={FoodCard}
                                mapItemData={mapItemData}
                                filterTypes={filterTypes}
                                filterValue={filterValue}
                                className="horizontal-list"
                                linkTarget="/"
                                freeScroll={isMobile}
                                frameSize={HORIZONTAL_LIST_FRAME_SIZE}
                                skeleton={isSkeleton}
                                listProps={{
                                    listContainerProps: {
                                        className: "list-container"
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}

const getItemHref = (item, filterTypes, filterValue) => {
    return `/${PRODUCT_PAGE_URL({
        id: item.id,
        category: item.category,
        type: item.type,
        manufacturer: item.manufacturer
    })}`;
};

const createFilterLinks = item => {
    const out = {};
    out.sub = ITEM_SEARCH_PAGE_URL({
        filterTypes: ["featureTitle"],
        filterValue: item.feature.title
    });
    out.cat = item.categories.map(
        category =>
            ITEM_SEARCH_PAGE_URL({
                filterTypes: [category.searchType],
                filterValue: category.text
            }),
        []
    );

    return out;
};

export default connect(
    state => {
        return {
            productItems: selectGroupedProductItems(state),
            user: selectUserData(state)
        };
    },
    {
        toggleFavorite
    }
)(Index);
