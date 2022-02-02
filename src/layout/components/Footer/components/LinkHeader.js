import React from 'react';
import cn from "classnames";

export default function(props) {
	const { 
        className, 
        style,
        ...others
    } = props;

    return (
        <div 
        	className={cn(
        		'link-header-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        />
    );
}