import React from 'react';
import cn from "classnames";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';

export default function(props) {
	const { 
        className, 
        style,
        startAdornment,
        endAdornment,
        InputProps={},
        showHelper,
        FormHelperTextProps={},
        ...others
    } = props;

    return (
        <TextField 
        	className={cn(
        		'default-text-field-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            InputProps={{
                ...InputProps,
                className: cn(
                    "input-container",
                    InputProps.className,
                ),                    
                startAdornment: (
                    <InputAdornment 
                        position="start" 
                        className="adornment"
                    >
                        {Boolean(startAdornment) && startAdornment}
                    </InputAdornment>
                ), 
                endAdornment: (
                    <InputAdornment 
                        position="end" 
                        className="adornment"
                    >
                        {Boolean(endAdornment) && endAdornment}
                    </InputAdornment>
                ), 
            }}
            FormHelperTextProps={{
                ...FormHelperTextProps,
                className: cn(
                    'helper',
                    {'show': showHelper},
                    FormHelperTextProps.className,
                ),
            }}
            {...others}
        />
    );
}