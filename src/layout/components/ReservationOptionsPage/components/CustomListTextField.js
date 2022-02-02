import React from 'react';
import cn from "classnames";

import CustomListTextField from "../../CustomListTextField";



export default function(props) {
	const {  
        className, 
        style,
        icon: Icon,
        border,
        ...others
    } = props;

    return (
        <CustomListTextField 
        	style={{
                ...style 
            }}
            className={cn(
                "custom-list-item-l2",
                className,
            )}            
            icon={Icon && <Icon className="icon" />}
            noBorder={!border}
            {...others}
        />
    );
}