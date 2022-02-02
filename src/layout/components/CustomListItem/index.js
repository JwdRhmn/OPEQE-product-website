import React from "react";
import cn from "classnames";

import ListItem from "@material-ui/core/ListItem";

 
export default function(props) {
    const {
        className,
        style,
        icon,
        noIcon,
        iconAlign,
        children,
        noBorder,
        action,
        actionProps,
        hideAction,
        iconProps,
        ...others
    } = props;

    return (
        <ListItem
            className={cn(
                "custom-list-item-l1",
                { "secondary-action": action },
                { "no-border": noBorder },
                className
            )}
            {...others}
        >
            {!noIcon && (
                <div
                    {...iconProps}
                    className={cn(
                        "list-icon",
                        iconProps && iconProps.className
                    )}
                    style={{
                        alignSelf: iconAlign && iconAlign,
                        ...(iconProps && iconProps.style)
                    }}
                >
                    {icon && icon}
                </div>
            )}
            {children}
            {action !== undefined && (
                <div 
                    {...actionProps}
                    className={cn(
                        "list-action", 
                        { hidden: hideAction },
                        actionProps && actionProps.className                        
                    )}
                >
                    {action}
                </div>
            )}
        </ListItem>
    );
}
