import React from 'react';
import cn from "classnames";

import CustomListItem from "../../CustomListItem";

export default function(props) {
	const {  
        className, 
        style,   
        label,
        value,   
        ...others
    } = props;

    return (
        <CustomListItem 
        	style={{
                ...style 
            }}
            className={cn(
                "custom-list-item-l2",
                className,
            )}         
            iconProps={{
                className: "icon",
            }}   
            button
            {...others}
        >
            <div className="text">
                <span className="label">
                    {label}
                </span>
                <br />
                <span className="value">
                    {value}
                </span>
            </div>
        </CustomListItem>                            
    );
}