import React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import Button from "../../DefaultButton";

export default function(props) {
    const { 
        className, 
        style,
        breakpoints,
        img,
        title,
        subTitle,
        description,
        textPrimaryProps,
        textSecondaryProps,
        href,
        buttonText,
        mainButtonProps:{
            captionStyle,
            ...mainButtonProps
        } = {},
        noImage,
        ...others
    } = props;

    return (
        <Grid 
            className={cn(
                "promo-item-l2",
                {"no-image": noImage}
            )}
            style={{
                ...style,
            }}
            item
            container
            justify="flex-start"
            {...others}
        >
            {!noImage && (
                <div className="image">
                    <img src={img} />
                </div>
            )}
            <Grid 
                className="body"
                container
                direction="column"
                justify="space-between"
            >
                <div className="text">
                    <div 
                        className="main"
                        {...textPrimaryProps}
                    >
                        {title}
                    </div>
                    <div 
                        className="sub"
                        {...textPrimaryProps}
                    >
                        {subTitle}
                    </div>                
                    <div 
                        className="description"
                        {...textSecondaryProps}
                    >
                        {description}
                    </div>
                </div>
                <div className="buttons">
                    <Button 
                        {...mainButtonProps}
                        component={Link}
                        to={href}
                    >
                        {buttonText.plain} 
                        &nbsp;
                        <span 
                            className="caption"
                            style={captionStyle}
                        >
                            {buttonText.caption}
                        </span>
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
}



