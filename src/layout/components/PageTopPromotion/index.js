import React from "react";
import cn from "classnames";
import { connect } from "react-redux";

import selectPromo from "../../../store/selectors/product/selectPromo";
import selectEvents from "../../../store/selectors/calendar/selectEvents";


import Grid from "@material-ui/core/Grid";

import PromoItem from "./components/PromoItem";
import Slider from "../Slider";

import isMobile from "../../../functions/isMobile";

import {
    PRODUCT_PAGE_URL,
    RESERVATION_DETAILS_PAGE_URL,
} from "../../config/routing";

function Index(props) {
    const {
        className,
        style,
        location,
        match,
        history,
        staticContext,
        itemHrefCreator=getItemHref,
        breakpoints = {
            xs: 11
        },
        promoItems: { data: promoItems },
        events: { list: eventList },
        backgroundColor,
        fillHeader,
        image,
        sliderButtonsProps,
        imageProps,
        itemProps,
        relative,
        sortBy="specials",
        ...others
    } = props;

    let items;
    if(sortBy === "specials"){
        items = promoItems.concat(eventList);
    } else {
        items = eventList.concat(promoItems);
    }

    return (
        <Grid
            className="page-top-promotion-l1"
            container
            justify="center"
            className={cn(
                "page-top-promotion-l1",
                { "top-padding": fillHeader },
                { mobile: isMobile },
                className
            )}
            style={{
                backgroundColor: backgroundColor,
                ...style
            }}
            {...others}
        >
            {image && (
                <div className="bg-image">
                    <img
                        src={require(`../../assets/images/photos/${image}`)}
                        {...imageProps}
                    />
                </div>
            )}
            {(items.length > 0) && (
                <Slider
                    breakpoints={breakpoints}
                    buttonsProps={sliderButtonsProps}
                    autoInterval={4000}
                    items={items.map(item => {
                        let href;;
                        let buttonText;
                        if(item.day){
                            buttonText = {
                                caption: "Find Table"
                            }
                            href = {
                                pathname:`/${RESERVATION_DETAILS_PAGE_URL()}`,
                                state: {
                                    event: item,
                                }
                            }
                        } else {
                            buttonText = {
                                plain: "Use",
                                caption: item.title
                            }
                            href = itemHrefCreator(item);
                        }
                        return (
                            <PromoItem
                                img={item.image}
                                title={item.title}
                                subTitle={item.subTitle}
                                description={item.description}
                                href={href}
                                buttonText={buttonText}
                                {...itemProps}
                            />
                        );
                    })}
                />
            )}
        </Grid>
    );
}

const getItemHref = item => {
    return `/${PRODUCT_PAGE_URL({
        id: item.id,
        category: item.category,
        type: item.type,
        manufacturer: item.manufacturer
    })}`;
};

export default connect(
    state => {
        return {
            promoItems: selectPromo(state),
            events: selectEvents(state),
        };
    },
    {}
)(Index);
