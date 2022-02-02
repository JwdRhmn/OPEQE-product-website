import React, { useState, useEffect } from 'react';
import cn from "classnames";
import produce from "immer";
import { connect } from "react-redux";

import addToCart from "../../../store/actions/cart/addItem";
import toggleFavorite from "../../../store/actions/product/toggleFavorite";
import getProductItemData from "../../../store/selectors/product/getProductItemData";
import selectUserData from "../../../store/selectors/user/selectUserData";


import Grid from "@material-ui/core/Grid";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import Header from "./components/Header";
import CircularGraphs from "./components/CircularGraphs";
import Pricing from "./components/Pricing";
import Ingredients from "./components/Ingredients";
import Descriptions from "./components/Descriptions";
import Options from "./components/Options";
import OrderMethod from "./components/OrderMethod";
import SimilarItems from "./components/SimilarItems";

import CarouselGallery from "../CarouselGallery";

import isMobile from "../../../functions/isMobile";


import { 
    SHOPPING_CART_PAGE_URL,
    HOME_PAGE_URL,
    LOG_IN_PAGE_URL,
    ITEM_SEARCH_PAGE_URL
} from "../../config/routing";
 
function Index(props) {
	const { 
        itemId,
        itemData:{
            data: itemData
        },
        addToCart,
        toggleFavorite,
        breakpoints,
        user: { data: userData },
        history,
        match,
        className, 
        style,
        ...others
    } = props;


    const optionGroups = itemData.optionGroups;


    const theme = useTheme();
    const breakForSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const [ selectedOptions, setSelectedOptions ] = useState(null);

    useEffect(() => {
        if(!optionGroups){
            return;
        }
        setSelectedOptions(
            initializeSelectedOptions(optionGroups)
        );
    }, [ optionGroups ])


    function handleSelection(groupIndex, optionIndex){
        setSelectedOptions(produce(newSelectedOptions => {
            const thisOptions = newSelectedOptions[groupIndex];
            for(let i = 0; i < thisOptions.length; i++){
                thisOptions[i] = false;
            }
            thisOptions[optionIndex] = true;
        }));
    }

    function handleAddToCart(count, goToCart, subscription){  
        let options = [];
        const selectionArray = selectedOptions.map( (selection, selectionIndex) => {
            return selection.reduce( (selectedIndexes, item, index) => {                    
                if(!item){
                    return selectedIndexes;
                }
                selectedIndexes.push(index);
                const group = optionGroups[selectionIndex];
                const groupItem = group.options[index];
                
                options.push({
                    id: groupItem.key,
                    categoryId: group.id,
                    categoryTitle: group.title,
                    title: groupItem.title,
                    price: groupItem.price,
                    priority: groupItem.priority,
                });
  
                return selectedIndexes;
            }, []);
        })

        addToCart({
            id: itemData.id,
            price: totalPrice,
            count,
            options,
            selectionArray,
            subscription
        });   

        if(goToCart){
            history.push(`/${SHOPPING_CART_PAGE_URL()}`);
        } else {
            history.push(`/${HOME_PAGE_URL()}`);
        }
    }

    function handleFav(){
        if(userData.token){
            toggleFavorite(itemData.id);
        } else {
            history.push(`/${LOG_IN_PAGE_URL()}`);
        }
    }

    function handleSubscribe(data){
        handleAddToCart(
            data.count,
            true,
            {
                id: itemData.subscription.id,
                every: data.deliverEvery,
                day: data.deliveryDay,
                time: data.time,
            }
        );
    }


    const skeleton = !itemData.title || !selectedOptions || !checkIfSync(selectedOptions, optionGroups);

    const selectedOptionTotals = !skeleton && getSelectedOptionTotals(selectedOptions, optionGroups);

    const optionTitles =  (
        (selectedOptionTotals && selectedOptionTotals.title.length) ? (
            selectedOptionTotals.title.join(',')
        ) : (
            ''
        )
    );

    const totalPrice = selectedOptionTotals.price;

    const headerProps = {
        title: itemData.title + ', ' + optionTitles,
        manufacturer: itemData.manufacturer,
        type: itemData.type,
        category: itemData.category,
        rate: 2.1,
        ratingCount: 10023,
        rateByStar: [24, 36, 30, 10, 0],
    }

    const orderMethodProps = {
        hasSubscribe: itemData.subscription.title,
        isFav: itemData.isFav,
        price: totalPrice,
        off: itemData.off,
        wantItQuestionText: '',
        wantItOurText: '',
        subscribeOff: {
            isPercent: itemData.subscription.percentage > 0,
            value: itemData.subscription.discount
        },
        labelBG: itemData.subscription.color,
        manufacturer: itemData.manufacturer,
        handleAddToCart,
        onFav: handleFav,
        isLoggedIn: userData.token ? true : false,
        deliverEveryData:    itemData.subscription.timePeriod,
        onSubscribe: handleSubscribe
    }

    const images = (
        selectedOptionTotals.image ? selectedOptionTotals.image : []
    ).concat(
        [itemData.image]
    ).concat(
        itemData.gallery ? itemData.gallery : []
    ).map(
        image => ({
            url: image,
            alt: itemData.title
        })
    );

    const descriptions =  [
        itemData.subTitle,
        itemData.description,
        ...(selectedOptionTotals ? selectedOptionTotals.description : [])
    ]


    return (
        <Grid 
        	className={cn(
        		'product-details-l1',
                {"mobile": isMobile},
        		className
        	)} 
        	style={{
                ...style 
            }}
            container
            item
            alignItems="flex-start"
            {...breakpoints}
            {...others}
        >
            <Grid 
                className='main'
                container
                item
                alignItems="flex-start"                
            >
                {breakForSmall && (
                    <div className="info">
                        <Header 
                            className="header"
                            skeleton={skeleton} 
                            {...headerProps}
                        />      
                    </div>
                )}
                <div className="gallery">                                            
                    <CarouselGallery
                        skeleton={skeleton}  
                        noIndicator={itemData.gallery && !itemData.gallery.length}                   
                        images={images}                 
                        horizontal={breakForSmall}
                    />
                </div>
                <div className="info">
                    {!breakForSmall && (
                        <Header
                            skeleton={skeleton} 
                            className="header" 
                            {...headerProps}
                        />
                    )}
                    <CircularGraphs
                        skeleton={skeleton} 
                        className="circular-graphs" 
                        graphs={itemData.compound}
                    />
                    <Pricing
                        skeleton={skeleton} 
                        price={totalPrice} 
                        off={itemData.off}
                        inStock={selectedOptionTotals.inStock}
                        hasCoupon=""
                        couponName=""
                        couponDescription=""
                        isMobile={isMobile}
                        special={itemData.special.title && {
                            isPercent: itemData.special.percentage > 0,
                            discount: (itemData.special.percentage > 0) ? (
                                itemData.special.percentage
                            ) : (
                                itemData.special.amount
                            ),
                            title: itemData.special.title,
                            description: itemData.special.description,
                            type: itemData.special.type,
                            policy: itemData.special.policy
                        }}
                        subscribe={{
                            title: itemData.subscription.title,
                            description: itemData.subscription.description,
                        }}
                    />
                    <Options
                        skeleton={skeleton} 
                        optionGroups={optionGroups}
                        selectedOptions={selectedOptions}
                        handleSelection={handleSelection}
                        getSelectedOption={getSelectedOption}
                    />
                    {breakForSmall && (
                        <Grid 
                            className={cn(
                                "order-method",
                                "inner"
                            )}
                            container
                            alignItems="center"
                        >
                            <OrderMethod
                                skeleton={skeleton}
                                noAddToCart
                                {...orderMethodProps}
                            />
                        </Grid>
                    )}
                    <Descriptions
                        skeleton={skeleton} 
                        descriptions={descriptions}
                    />
                    <Ingredients
                        skeleton={skeleton} 
                        graphs={itemData.ingredients}
                        hrefCreator={createGraphFilterLinks}
                    />
                </div>
                {!breakForSmall &&(
                    <div className="order-method">
                        <OrderMethod
                            skeleton={skeleton}
                            {...orderMethodProps}
                        />
                    </div>
                )}
            </Grid>
            {(!skeleton) && (
                <Grid 
                    className='bottom'
                    container
                    item
                >
                    <SimilarItems
                        skeleton={skeleton}  
                        category={itemData.category.title}
                        type={itemData.type.title}
                        manufacturer={itemData.manufacturer.title}
                        feature={itemData.feature.title}
                        itemId={itemData.id}
                        isLoggedIn={userData.token ? true : false}
                        handleFav={handleFav}
                        history={history}
                    />                
                </Grid>
            )}
        </Grid>
    );
}



const initializeSelectedOptions = optionGroups => {  
    const selections = [];
    let minPrice;
    let thisOption;
    let hasDefault;
    for (let i = 0; i < optionGroups.length; i++) {
        minPrice = 0;
        hasDefault = false;
        for (let j = 0; j < optionGroups[i].options.length; j++) {
            thisOption = optionGroups[i].options[j];
            if(thisOption.isDefault){
                selections.push(j);
                hasDefault = true;
                break;
            }
            if(thisOption.price < optionGroups[i].options[minPrice].price){
                minPrice = j;
            }
        }
        if(!hasDefault){
            selections.push(minPrice);
        }
    }  
    return optionGroups.map(
        (optionGroup, groupIndex) => optionGroup.options.map(
            (option, optionIndex) => selections[groupIndex] === optionIndex
        )
    );
}

const getSelectedOption = (selectedOptions, optionGroups, groupIndex) => {
    const index = selectedOptions[groupIndex].findIndex( item => item );
    if(index !== -1){
        return optionGroups[groupIndex].options[index];
    }

    return {};
}

const getSelectedOptionTotals = (selectedOptions, optionGroups) => {
    let out = {
        title: [],
        description: [],
        price: 0,
        inStock: true,
        image: []
    };
    const optionDescriptions = [];
    for(let i = 0; i < selectedOptions.length; i++){
        if(optionGroups[i].description){
            out.description.push(optionGroups[i].description);
        }
        for(let j = 0; j < selectedOptions[i].length; j++){
            if(selectedOptions[i][j]){
                out.title.push(optionGroups[i].options[j].fullTitle);
                out.inStock &= optionGroups[i].options[j].inStock;
                if(optionGroups[i].options[j].image){
                    out.image.push(optionGroups[i].options[j].image);
                }
                if(i === 0){
                    out.price = (parseFloat(optionGroups[i].options[j].price));
                } else {
                    out.price *= (parseFloat(optionGroups[i].options[j].price));
                }
                if(optionGroups[i].options[j].description){
                    optionDescriptions.push(optionGroups[i].options[j].description);
                }
            }
        }
    }

    out.description = out.description.concat(optionDescriptions)

    return out;
}


function checkIfSync(selectedOptions, optionGroups){
    if(!optionGroups || optionGroups.length !== selectedOptions.length){
        return false;
    }

    for(let i = 0; i < optionGroups.length; i++){
        const options = optionGroups[i].options;
        if(!selectedOptions[i] || options.length !== selectedOptions[i].length){
            return false;
        }
    }
    return true;
}


const createMapStateToProps = () => {
    const selectItemData = getProductItemData();
    const mapStateToProps = (state, props) => {
        return {
            itemData: selectItemData(state, props),
            user: selectUserData(state)
        };
    };
    return mapStateToProps;
};


const createGraphFilterLinks = graph => {
    return `/${ITEM_SEARCH_PAGE_URL({
        filterTypes: [graph.searchType],
        filterValue: graph.name
    })}`;
};

export default connect(
    createMapStateToProps,
    {
        addToCart,
        toggleFavorite
    }
)(Index);