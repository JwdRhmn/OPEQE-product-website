import React from 'react';
import cn from "classnames";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function(props) {
	const { 
        className, 
        style,
        label,
        placeholder,
        inputProps,
        underlined,
        ...others
    } = props;

    return (
        <FormControl 
            className={cn(
                "custom-select-l1",
                {'underlined': underlined}
            )}
            fullWidth
        >
            {label && (
                <InputLabel className="label">{label}</InputLabel>
            )}
            <Select
            	className={cn(
            		'select',
            		className
            	)} 
            	style={{
                    ...style 
                }}
                inputProps={{
                    ...inputProps,
                    className: cn(
                        "select-input",
                        (inputProps && inputProps.className)
                    ),
                    placeholder: 'hey',
                }}
                {...others}
            />
        </FormControl>
    );
}