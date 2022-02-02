import React from 'react';
import cn from "classnames";

import Grid from "@material-ui/core/Grid";

import OrderOptions from "../OrderOptions";

import isMobile from "../../../functions/isMobile";

export default function(props) {
    const { 
        className, 
        style,
        history,
        location,
        match,
        staticContext, // just take out of others
        ...others
    } = props;

    const breakpoints = {
        xs: 11,
        sm: 8, 
        md: 6,  
        lg: 5,
        xl: 5,
    }

    return (
        <Grid 
            className={cn(
                'order-options-page-l1',
                {"mobile": isMobile},
                className
            )} 
            style={{
                ...style 
            }}
            justify="center"
            container
            {...others}
        >
            <OrderOptions
                history={history}
                location={location}
                breakpoints={breakpoints}
            />
        </Grid>
    );
}
