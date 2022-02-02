import React from "react";
import cn from "classnames";

import Grid from "@material-ui/core/Grid";

import isMobile from "../../../functions/isMobile";

export default function(props) {
    const {
        className,
        style,
        rootProps = {},
        containerProps,
        component,
        children,
        justify="center",
        breakpoints = {
            xs: 12
        },
        ...others
    } = props;

    const Component = component ? component : "div";

    return (
        <Component
            {...rootProps}
            className={cn(
                "bottom-fixed-button-l1",
                "fade-by-page-transition",
                { mobile: isMobile },
                { desktop: !isMobile },
                className
            )}
            style={{
                ...style
            }}
            {...others}
        >
            <Grid
                {...containerProps}
                className={cn(
                    "bottom-fixed-content", 
                    containerProps && containerProps.className
                )}
                container
                item
                justify={justify}
                {...breakpoints}
            >
                {children}
            </Grid>
        </Component>
    );
}
