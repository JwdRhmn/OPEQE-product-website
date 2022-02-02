import React from 'react';
import cn from "classnames";

import Grid from "@material-ui/core/Grid";

import OrderOptionsBar from "../OrderOptionsBar";

export default function(props) {
	const { 
        className, 
        style,
        location,
        match,
        history,
        staticContext,
        ...others
    } = props;


    return (
        <Grid 
        	className={cn(
        		'extra-order-promotion-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <div className="title">
                Ready to order?
            </div>
            <div className="sub-title">
                Browse our menu for dine-in, delivery or pickup and catering
            </div>
            <OrderOptionsBar className="order-options-bar" />
        </Grid>
    );
}