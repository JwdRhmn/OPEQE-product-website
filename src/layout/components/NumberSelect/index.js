import React from 'react';
import cn from "classnames";

import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import Button from "../DefaultButton";

export default function(props) {
	const { 
        className, 
        style,
        value,
        disabled,
        onDecrement,
        onIncrement,
        decDisabled,
        incDisabled,
        theme="dark",
        round=true,
        buttonProps,
        noValue,
        ...others
    } = props;


    return (
        <div 
        	className={cn(
        		'number-select-l1',
                `theme-${theme}`,
                {"round": round},
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <Button 
                {...buttonProps}
                className={cn(
                    "number-button",
                    buttonProps && buttonProps.className
                )}
                containerProps={{
                    className: "number-button-container"
                }}
                onClick={onDecrement} 
                disabled={decDisabled}
                round={round}
                theme={theme}
            >
                <RemoveIcon className="icon" />
            </Button>                
            {!noValue && (
                <span className="text">
                    {value}
                </span>
            )}
            <Button 
                {...buttonProps}
                className={cn(
                    "number-button",
                    buttonProps && buttonProps.className
                )}
                containerProps={{
                    className: "number-button-container"
                }}
                onClick={onIncrement} 
                disabled={incDisabled} 
                round={round}
                theme={theme}
            >
                <AddIcon className="icon" />
            </Button>
        </div>
    );
}