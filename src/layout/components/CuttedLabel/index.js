import React from 'react';
import cn from "classnames";

export default function(props) {
	const {
        children,
        noStart,
        noEnd,
        bgColor,
        className, 
        style,
        ...others
    } = props;

    return (
        <span 
        	className={cn(
        		'cutted-label-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >               
            {!noStart && (
                <span 
                    className="cutter start" 
                    style={{
                        backgroundColor: bgColor
                    }}
                />   
            )}
            <span className="text">
                {children}
            </span>
            {!noEnd && (
                <span 
                    className="cutter end" 
                    style={{
                        backgroundColor: bgColor
                    }}
                />
            )}
        </span>
    );
}