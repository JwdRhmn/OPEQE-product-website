import React from 'react';
import cn from "classnames";


import Grid from '@material-ui/core/Grid';

import Button from "../DefaultButton";
import StyledNotification from "../StyledNotification";

export default function(props) {
    const { 
        className, 
        style,        
        onClose,
        onReorder,
        img,
        currentItemCount,
        loading,
        ...others
    } = props;

    return (
        <StyledNotification 
            className={cn(
                "reorder-notification-l1",
                className,
            )}   
            style={{
                ...style 
            }}
            onClose={onClose}
            {...others}
        >
            <div className="img-container">                    
                <img src={img} />
            </div>
            <div className="body">
                <span className="title">
                    Continue with reorder ?
                </span>
                <span className="sub-title">
                    You still have {currentItemCount} items in your cart
                </span>
                <span className="text">
                    Are you going to replace them by your reorder items ?
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
                    onClick={onReorder}
                    waiting={loading}         
                >
                    Continue With Reorder
                </Button>
                <Button
                    theme="light-gray"  
                    width="100%"      
                    onClick={onClose}  
                >
                    Changed My Mind
                </Button>
            </Grid>
        </StyledNotification>
    );
}

