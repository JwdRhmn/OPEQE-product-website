import React from 'react';
import cn from "classnames";

import Grid from "@material-ui/core/Grid";

import isMobile from "../../../functions/isMobile";

export default function(props) {
	const { 
        className, 
        style,
        icon: Icon,
        ...others
    } = props;

    return (
        <Grid 
        	className={cn(
        		'empty-list-icon-l1',
                "fade-by-page-transition",
                {'mobile': isMobile},
        		className
        	)} 
        	style={{
                ...style 
            }}
            container
            justify="center"
            alignItems="center"
            {...others}
        >
            <Icon 
                className="icon" 
                fontSize="inherit"
            />
        </Grid>
    );
}