import React from 'react';
import cn from "classnames";


export default function(props) {
	const { 
        className, 
        style,
        location,
        history,
        staticContext,
        ...others
    } = props;
    
    return (
        <div 
        	className={cn(
        		'not-found-page-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            404 Component (IN PROGRESS)
        </div>
    );
}