import React from 'react';
import cn from "classnames";

import Grid from '@material-ui/core/Grid';

import TextField from "../../TextField";
import DefaultButton from "../../DefaultButton";

export default function(props) {
	const { 
        className, 
        style,
        onChange,
        value,
        onSubmit,
        location,
        match,
        history,
        staticContext,
        ...others
    } = props;

    return (
        <Grid 
        	className={cn(
        		'form-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            container
            justify="center"
            alignItems="center"
            {...others}
        >
            <TextField 
                className="phone" 
                InputProps={{
                    className: "input-container"
                }}
                placeholder="e.g. +18774667373"
                value={value}
                onChange={onChange}
            />
            <DefaultButton 
                className="button"
                containerProps={{
                    className: "button-container"
                }}
                onClick={onSubmit}                
            >
                <span className="large"> 
                    Text Me   
                </span>
                &nbsp;
                <span className="small">
                    demo App
                </span>
            </DefaultButton>
        </Grid>
    );
}