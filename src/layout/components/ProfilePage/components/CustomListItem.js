import React from "react";
import cn from "classnames";

import CustomListItem from "../../CustomListItem";

export default function(props) {
    const { textProps, className, style, text, ...others } = props;

    return (
        <CustomListItem
            button
            style={{
                ...style
            }}
            className={cn("custom-list-item-l2", className)}
            iconProps={{
                className: "icon"
            }}
            {...others}
        >
            <span
                {...textProps}
                className={cn("text", textProps && textProps.className)}
            >
                {text}
            </span>
        </CustomListItem>
    );
}
