import React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import StyledNotification from "../StyledNotification";
import Button from "../DefaultButton";

import {
    HOME_PAGE_URL
} from "../../config/routing";
import {
    storeName
} from "../../config/store";

export default function(props) {
    const {  
        className, 
        style,
        confirmation,
        firstName,
        orderType,
        onClose,
        onDismiss,
        ...others
    } = props;


    function handleDismiss(){
        if(onDismiss){
            onDismiss();
        }
        if(onClose){
            onClose();
        }
    }

    return (
        <StyledNotification 
            style={{
                ...style 
            }}
            className={cn(
                "place-order-notification-l1",
                className
            )}
            onClose={handleDismiss}
            {...others}
        >
            <div className="body">
                <div className="title">
                    Order Confirmation
                </div>
                <div className="sub-title">
                    {firstName}, Your "{orderType}" order has been submitted successfully.
                    <br/>
                    The kitchen is preparing your order.
                    <br/>
                    Thanks for choosing {storeName}
                </div>
                <span className="text">
                    Confirmation #{confirmation}
                </span>
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
                    theme="gray"
                >
                    See Directions
                </Button>
                <Button
                    width="100%"   
                    component={Link}             
                    to={`/${HOME_PAGE_URL()}`}
                    onClick={onClose}
                >
                    Explore Our Menu
                </Button>
            </Grid>
        </StyledNotification>
    );
}