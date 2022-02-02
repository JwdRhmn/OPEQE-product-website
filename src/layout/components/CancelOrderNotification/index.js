import React from 'react';
import cn from "classnames";



import Grid from '@material-ui/core/Grid';

import Button from "../DefaultButton";
import StyledNotification from "../StyledNotification";
import ItemImage from "../ItemImage";

export default function(props) {
    const { 
        className, 
        style,        
        onClose,
        img,
        itemCount,
        onCancel,
        loading,
        ...others
    } = props;

    return (
        <StyledNotification 
            className={cn(
                "cancel-order-notification-l1",
                className,
            )}   
            style={{
                ...style 
            }}
            onClose={onClose}
            {...others}
        >
            <div className="img-container">                    
                <ItemImage src={img} />
            </div>
            <div className="body">
                <span className="title">
                    Cancel Order
                </span>
                <span className="sub-title">
                    You have {itemCount} items in this order
                </span>
                <span className="text">
                    If you cancel your order AFTER the kitchen started preparing it, you may only receive a partial refund
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
                    onClick={onCancel}
                    waiting={loading}         
                >
                    Continue With Cancel
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

