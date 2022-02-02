import React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import StyledNotification from "../StyledNotification";
import Button from "../DefaultButton";

import {
    HOME_PAGE_URL,
    RESERVATION_OPTIONS_PAGE_URL,
} from "../../config/routing";

export default function(props) {
    const {  
        className, 
        style,
        refrenceCode,
        onClose,
        ...others
    } = props;


    return (
        <StyledNotification 
            style={{
                ...style 
            }}
            className={cn(
                "cancel-reserve-notification-l1",
                className,
            )}
            onClick={onClose}
            {...others}
        >
            <div className="body">
                <div className="title">
                    Reservation has been cancelled
                </div>
                <div className="sub-title">
                    Your reservation has been cancelled successfully
                    <br/>
                    We look forward to see you again
                </div>
                <span className="text">
                    Confirmation #{refrenceCode}
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
                    component={Link}             
                    to={`/${RESERVATION_OPTIONS_PAGE_URL()}`}
                    onClick={onClose}
                >
                    Find a Table
                </Button>
                <Button
                    theme="gray"  
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