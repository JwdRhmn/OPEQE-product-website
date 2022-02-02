import React, { useState } from 'react';
import cn from "classnames";
import { connect } from "react-redux";

import selectSimilarProduct from "../../../../store/selectors/product/selectSimilarProduct";

import isMobile from "../../../../functions/isMobile";

import HorizontalListContainer from "../../HorizontalListContainer";
import FoodCard from "../../FoodCard";
import SpecialDetailsNotification from "../../SpecialDetailsNotification";


import { 
    PRODUCT_PAGE_URL,
    ITEM_SEARCH_PAGE_URL
} from "../../../config/routing";
import { 
    PRODUCT_PAGE_FOOD_CARD_PROPS,
    HORIZONTAL_LIST_FRAME_SIZE
} from "../../../config/layout";


function Index(props) {
	const { 
        itemId,
        category,
        type,
        manufacturer,
        feature,
        similarItems: {
            items: similarItems,
            feeLabel, 
            deliveryFee
        },
        skeleton,
        handleFav,
        isLoggedIn,
        history,
        className, 
        style,
        ...others
    } = props;

    const [showSpecialDetails, setShowSpecialDetails] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    
    function itemlabelClick(item) {
        setSelectedItem(item);
        setShowSpecialDetails(true);
    }
    function handleSpecialUse() {
        setShowSpecialDetails(false);    
        setTimeout(
            () =>
                history.push(
                    getItemHref(selectedItem)
                ),
            400
        );
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
            	className={cn(
            		'similar-items-l2',
            		className
            	)} 
            	style={{
                    ...style 
                }}
                {...others}
            >        
                {
                    renderHorizontalList({
                        isSkeleton: skeleton,
                        itemlabelClick,
                        handleFav: handleFav,
                        hideFav: !isLoggedIn,
                        bottomLabel: feeLabel,
                        deliveryFee: deliveryFee,
                        items: similarItems
                    })
                }
            </div>
        </>
    );
}



const renderHorizontalList = ({
    isSkeleton,
    itemlabelClick,
    handleFav,
    hideFav,
    bottomLabel,
    deliveryFee,
    items
}) => {
    if (!items.length) {
        return null;
    }

    return (
        <HorizontalListContainer
            className="horizontal-list"
            title="Similar Items"
            freeScroll={isMobile}
            frameSize={HORIZONTAL_LIST_FRAME_SIZE}
            skeleton={isSkeleton}
            listProps={{
                listContainerProps: {
                    className: "list-container"
                }
            }}
        >
            {items.map((item, index) => {
                const { id, special, feature, ...others } = item;

                let href;
                let filterLinks;
                if(!isSkeleton){
                    href = getItemHref(item);
                    filterLinks = createFilterLinks(item);
                }

                return (
                    <div key={id}>
                        <div className="card-container">
                            {isSkeleton ? (
                                <FoodCard 
                                    skeleton={true} 
                                    layoutProps={PRODUCT_PAGE_FOOD_CARD_PROPS}
                                />
                            ) : (
                                <FoodCard
                                    {...others}
                                    onLabelClick={() => itemlabelClick(item)}
                                    onFav={handleFav}
                                    label={special.title}
                                    timeRemaining={special.remainingTime}
                                    href={href}
                                    subTitle={feature.title}
                                    subTitleHref={filterLinks.sub}
                                    categoryHrefs={filterLinks.cat}
                                    id={id}
                                    hideFav={hideFav}
                                    bottomLabel={bottomLabel}
                                    layoutProps={PRODUCT_PAGE_FOOD_CARD_PROPS}
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </HorizontalListContainer>
    );
};

const getItemHref = item => {
    return `/${PRODUCT_PAGE_URL({
        id: item.id,
        category: item.category.title,
        type: item.type.title,
        manufacturer: item.manufacturer.title
    })}`;
};

const createFilterLinks = item => {
    const out = {};
    out.sub = ITEM_SEARCH_PAGE_URL({
        filterTypes: ["featureTitle"],
        filterValue: item.subTitle
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


const createMapStateToProps = () => {
    const selectItemData = selectSimilarProduct();
    const mapStateToProps = (state, props) => {
        return {
            similarItems: selectItemData(state, props)
        };
    };
    return mapStateToProps;
};

export default connect(
    createMapStateToProps,
    {}
)(Index);