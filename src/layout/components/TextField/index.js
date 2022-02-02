import React from 'react';
import cn from "classnames";

import TextField from '@material-ui/core/TextField';

export default function(props) {
	const { 
        className, 
        style,
        location,
        match,
        history,
        staticContext,
        InputProps,
        underline,
        ...others
    } = props;

    return (
        <TextField 
        	className={cn(
        		'text-field-l1',
                {"no-underline": !underline},
        		className
        	)} 
        	style={{
                ...style 
            }}
            InputProps= {{
                ...InputProps,
                className: cn(
                    "input-container",
                    (InputProps && 
                        InputProps.className
                    ),
                ),
            }}
            {...others}
        />
    );
}