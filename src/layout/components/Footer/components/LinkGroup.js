import React from 'react';
import cn from "classnames";

export default function(props) {
	const { 
        className, 
        style,
        header,
        children,
        ...others
    } = props;

    return (
        <div 
        	className={cn(
        		'link-group-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <div className="header">
                {header}
            </div>
            <div className="body">
                {children}
            </div>
        </div>
    );
}