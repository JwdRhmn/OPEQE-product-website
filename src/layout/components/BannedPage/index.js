import React from 'react';
import cn from "classnames";

import Grid from "@material-ui/core/Grid";

import { contactOPEQE } from "../../config/opeqe";

import OpeqeLogo from "../OpeqeLogo";

export default function(props) {
	const { 
        className, 
        style,
        type,
        ...others
    } = props;

    return (
        <Grid 
        	className={cn(
        		'banned-page-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            container
            direction="column"
            justify="space-between"
            {...others}
        >
            <div className="message">
                <div className="title">
                    Demo Expired
                </div>
                <div className="description">
                    Your demo period has been expired.
                    <br/>
                    For more information please contact Opeqe.                    
                </div>
                <div className="phone">
                    {contactOPEQE}
                </div>
            </div>
            <div className="logo">
                <OpeqeLogo showText color="light" width="250" />
            </div>
        </Grid>
    );
}