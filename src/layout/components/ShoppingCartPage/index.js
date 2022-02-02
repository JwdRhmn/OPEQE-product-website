import React, { useEffect } from "react";
import cn from "classnames";


import Grid from "@material-ui/core/Grid";

import ShoppingCart from "../ShoppingCart";

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
        xs: 12,
        sm: 8,
        md: 6,
        lg: 5,
        xl: 5
    };

    return (
        <Grid
            className={cn(
                "shopping-cart-page-l1",
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
            <Grid item container {...breakpoints}>
                <ShoppingCart history={history} pageURL={match.url} />
            </Grid>
        </Grid>
    );
}
