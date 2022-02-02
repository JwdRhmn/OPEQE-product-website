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
        title,
        onUse,
        useText,
        description,
        ...others
    } = props;

    return (
        <StyledNotification 
            className={cn(
                "special-details-notification-l1",
                className,
            )}   
            style={{
                ...style 
            }}
            onClose={onClose}
            {...others}
        >
            {img && (
                <div className="img-container">                    
                    <ItemImage src={img} />
                </div>
            )}
            <div className="body">
                <span className="title">
                    {title}
                </span>
                <span className="sub-title">
                    {description}
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
                    onClick={onUse}      
                >
                    {useText ? (
                        useText
                    ) : (
                        <>
                            Use 
                            &nbsp;
                            <span className="caption">{title}</span>
                        </>
                    )}
                </Button>
            </Grid>
        </StyledNotification>
    );
}

