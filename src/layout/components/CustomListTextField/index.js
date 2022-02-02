import React, { useState } from 'react';
import cn from "classnames";

import ListItem from '@material-ui/core/ListItem';

import TextField from '../TextField';

export default function ({
    className, 
    style,
    textProps={},
    max,
    noBorder,
    noIcon,
    iconAlign,
    iconProps,
    icon,
    ...others
}){

    const [ inputValue, setInputValue ] = useState('');

    const handleChange = event => {
        let { value } = event.target;

        if(max && value.length > max){
            value = value.substr(0, max);
        }

        const { onChange } = textProps;
        
        if(onChange){
            onChange(event);
        }

        setInputValue(value);
    }

    const remainingChars = max ? max - inputValue.length : false;

    return (
        <ListItem 
            className={cn(
                "custom-list-textfield-l1",
                {'secondary-action': max},
                {'no-border': noBorder},
                className,
            )}
            style= {{
                ...style 
            }}
            {...others}
        >  
            {!noIcon && 
                <div 
                    className="list-icon"
                    style={{
                        alignSelf: iconAlign && iconAlign,
                    }}
                    {...iconProps}
                >
                    {icon && icon}
                </div>
            }
            <TextField 
                {...textProps}
                className={cn(
                    "textfield",
                    (textProps && 
                        textProps.className
                    ),
                )}                
                value={inputValue}
                onChange={handleChange}
            />
            {max && 
                <div className="list-action">
                    {remainingChars}
                </div>
            }
        </ListItem>
    )
}