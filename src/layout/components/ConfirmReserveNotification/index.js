import React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import StyledNotification from "../StyledNotification";
import Button from "../DefaultButton";

import {
    HOME_PAGE_URL
} from "../../config/routing";

export default function(props) {
    const {  
        className, 
        style,
        refrenceCode,
        onClose,
        onDismiss,
        onDine,
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

    function handleDine(){
        if(onDine){
            onDine();
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
                "confirm-reserve-notification-l1",
                className,
            )}
            onClose={handleDismiss}
            {...others}
        >
            <div className="body">
                <div className="title">
                    See you soon!
                </div>
                <div className="sub-title">
                    Your request has been confirmed
                    <br/>
                    We look forward to see you soon
                </div>
                <span className="text">
                    Refrence #{refrenceCode}
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
                    containerProps={{
                        className: 'button-container',
                    }} 
                    onClick={handleDine}
                >
                    Dine Wait Free
                </Button>
                <Button
                    theme="green"
                    containerProps={{
                        className: 'button-container',
                    }} 
                    onClick={onClose}
                >
                    See How
                </Button>
                <Button
                    theme="gray"  
                    width="100%"   
                    component={Link}             
                    to={`/${HOME_PAGE_URL()}`}
                    onClick={onClose}
                    replace
                >
                    Explore Our Menu
                </Button>
            </Grid>
        </StyledNotification>
    );
}