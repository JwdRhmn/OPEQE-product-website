import React from 'react';
import cn from "classnames";
import SimpleBar from 'simplebar-react';

export default function(props) {
	const { 
        className, 
        style,
        location,
        match,
        history,
        staticContext,
        hidden,
        forwardRef,
        scrollableProps,
        ...others
    } = props;

    return (
        <SimpleBar 
        	className={cn(
        		'scrollable-container-l1',
                {'hidden': hidden},
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
            scrollableNodeProps={{ 
                ...scrollableProps,
                ref: forwardRef,
                className: cn(
                    "scrollable",
                    scrollableProps && scrollableProps.className
                ),
                style:{
                    overflow: 'hidden',
                }
            }}
        />
    );
}