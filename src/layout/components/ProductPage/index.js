import React from 'react';
import cn from "classnames";

import Grid from "@material-ui/core/Grid";

import ProductDetails from "../ProductDetails";

import isMobile from "../../../functions/isMobile";

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

    const breakpoints = {
        xs: 11,
    }

    const itemId = match.params.id;

    return (
        <Grid 
        	className={cn(
        		'product-page-l1',
                {"mobile": isMobile},
        		className
        	)} 
        	style={{
                ...style 
            }}
            container
            justify="center"
            {...others}
        >
            <ProductDetails 
                itemId={itemId}
                match={match}
                history={history}
                breakpoints={breakpoints}
            />
        </Grid>
    );
}