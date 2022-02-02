import React from 'react';
import cn from "classnames";
import { Link as RouterLink } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import Link from "./Link";

import { ReactComponent as GooglePlayBadgeSVG } from "../../../assets/images/photos/google-play-badge.svg";
import { ReactComponent as AppStoreBadgeSVG } from "../../../assets/images/photos/app-store-badge.svg";

export default function(props) {
	const { 
        breakpoints,
        className, 
        style,
        ...others
    } = props;


    return (
        <Grid 
        	className={cn(
        		'top-l2',
        		className
        	)} 
        	style={{
                ...style,
            }}
            container
            item
            alignItems="center"
            justify="space-between"
            {...breakpoints}
            {...others}
        >
            <div className="app">
                <RouterLink className="apple">
                    <AppStoreBadgeSVG />
                </RouterLink>
                <RouterLink className="google">
                    <GooglePlayBadgeSVG />
                </RouterLink>
            </div>
            <div className="links">
                <Link className="link" inline>
                    About
                </Link>
                <Link className="link" inline>
                    Services
                </Link>
                <Link className="link" inline>
                    Support
                </Link>
                <Link className="link" inline>
                    Gallery
                </Link>
                <Link className="link" inline>
                    Terms
                </Link>
            </div>
        </Grid>
    );
}