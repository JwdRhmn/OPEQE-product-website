import React from 'react';
import cn from "classnames";

import Body from "./Body";
import Avatar from "./Avatar";

export default function(props) {
	const {  
        className, 
        style,   
        avatarProps,     
        bodyProps,
        isMobile,
        ...others
    } = props;

    return (
        <div 
        	style={{
                ...style 
            }}
            className={cn(
                "dashboard-l2",
                {"mobile": isMobile},
                className,
            )}     
            {...others}
        >
            <Avatar                 
                {...avatarProps}
            />

            <Body                 
                {...bodyProps}
            />
        </div>                            
    );
}