import React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

export default function(props) {
	const { 
        className, 
        style,
        inline,
        noPadding,
        ...others
    } = props;


    return (
        <Link 
        	className={cn(
        		'link-l2',
                {'inline': inline},
                {'no-padding': noPadding},
        		className
        	)} 
        	style={{
                ...style,
            }}
            {...others}
        />
    );
}