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
        title,
        subTitle,
        text,
        img,
        ...others
    } = props;

    return (
        <StyledNotification 
            className={cn(
                "push-notification-l1",
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
                    {title}
                </span>
                <span className="sub-title">
                    {subTitle}
                </span>
                <span className="text">
                    {text}
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
                    theme="light-gray"  
                    width="100%"      
                    onClick={onClose}  
                >
                    Close
                </Button>
            </Grid>
        </StyledNotification>
    );
}

