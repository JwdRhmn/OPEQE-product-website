import React from 'react';
import cn from "classnames";
import { Link as RouterLink } from "react-router-dom";

import Link from "./Link";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';

import {socialLinks} from "../../../config/store";

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
        		'bottom-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            container
            item
            justify="center"
            {...breakpoints}
            {...others}
        >
            <div className="description">
                <div className="title">
                    Delight customers everywhere with a branded custom-built native iOS, native Android and Installable Website Application.
                </div>
                <div className="text">
                    Opeqe is reliable, fast and commission free all-in-one ordering solutions for multi-location or single location restaurants.
                </div>
            </div>
            <Grid 
                className="others"
                container
                item
                justify="space-between"
                alignItems="center"
            >
                <div className="links">
                    <span className="copy-right">
                        ©2019 OPEQE INC
                    </span>
                    |
                    <Link inline>
                        Terms & Conditions
                    </Link>
                    |
                    <Link inline>
                        Privacy Policy
                    </Link>
                </div>
                <div className="social">
                    <IconButton 
                        href={socialLinks.instagram}
                        component={'a'}
                        target="_blank"
                    >
                        <InstagramIcon />
                    </IconButton>
                    <IconButton 
                        href={socialLinks.twitter}
                        component={'a'}
                        target="_blank"
                    >
                        <TwitterIcon />
                    </IconButton>
                    <IconButton 
                        href={socialLinks.facebook}
                        component={'a'}
                        target="_blank"
                    >
                        <FacebookIcon />
                    </IconButton>
                    <IconButton 
                        href={socialLinks.youtube}
                        component={'a'}
                        target="_blank"
                    >
                        <YouTubeIcon />
                    </IconButton>
                </div>
            </Grid>
        </Grid>
    );
}