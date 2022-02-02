import React from 'react';
import cn from "classnames";

import Notification from "../Notification";

export default function(props) {
	const { 
        className, 
        style,
        PaperProps,
        ...others
    } = props;

    return (
        <Notification 
        	className={cn(
        		'styled-notification-l1',
        		className
        	)} 
            PaperProps={{
                className: cn(
                    "styled-paper",
                    PaperProps && PaperProps.className
                ),
            }}
        	style={{
                ...style 
            }}
            {...others}
        />
    );
}