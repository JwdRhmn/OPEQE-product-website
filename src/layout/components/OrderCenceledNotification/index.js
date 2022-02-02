import React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

import Button from "../DefaultButton";


import Grid from '@material-ui/core/Grid';

import {
    storeName,
} from "../../config/store";

import {
    HOME_PAGE_URL
} from "../../config/routing";

import StyledNotification from "../StyledNotification";

export default function(props) {
	const { 
        className, 
        style,
        onClose,
        code,
        location,
        match,
        history,
        staticContext,
        ...others
    } = props;

    return (
        <StyledNotification 
        	className={cn(
        		'order-cenceled-notification-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            onClose={onClose}
            {...others}
        >
            <div className="body">                
                <div className="title">
                    Order has been cancelled
                </div>
                <div className="sub-title">
                    Your order has been cancelled successfully. 
                    <br />
                    You may reorder it from recent order section.
                    <br />
                    Thank you for choosing {storeName}
                </div>
                <div className="text">
                    Confirmation #{code}
                </div>
            </div>
            <Grid
                container
                justify="space-between"
                style={{
                    marginTop: '15px',
                }}
            >
                <Button
                    width="100%"   
                    component={Link}       
                    to={`/${HOME_PAGE_URL()}`}
                >
                    Explore Our Menu
                </Button>
                <Button
                    theme="light-gray"  
                    width="100%"      
                    onClick={onClose}  
                >
                    Dismiss
                </Button>
            </Grid>
        </StyledNotification>
    );
}