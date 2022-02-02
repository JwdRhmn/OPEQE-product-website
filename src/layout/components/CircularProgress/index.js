import React from 'react';
import cn from "classnames";

import CircularProgress from '@material-ui/core/CircularProgress';

export default function(props) {
	const { 
        className, 
        style,
        ...others
    } = props;

    return (
        <CircularProgress 
        	className={cn(
        		'circular-progress-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        />
    );
}