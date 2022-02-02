import React, { useState, useEffect, useMemo } from 'react';
import cn from "classnames";

import DateRangeIcon from "@material-ui/icons/DateRange";

import DefaultTextField from "../DefaultTextField";

export default function(props) {
    const { 
        className, 
        style,
        initValue='',
        onChange,
        ...others
    } = props;

    const initState = {
        value: initValue,
        isValid: false,        
        isComplete: false,
    }
    const [ state, setState ] = useState(initState);

    useEffect(() => {
        update(state.value);
    }, [])

    function update(number){
        const newState = validate(number, now);
        setState( newState );
        if(onChange){
            onChange(newState);
        }
    }

    function handleChange(event){ 
        update( event.target.value );
    }

    const now = useMemo( () => new Date(), []);

    return (
        <DefaultTextField  
            className={cn(
                'plain-date-input-l1',
                className
            )} 
            style={{
                ...style 
            }}  
            placeholder="e.g. 07 / 2023"                  
            startAdornment={<DateRangeIcon />}
            helperText="Invalid Date"
            showHelper={state.isComplete && !state.isValid} 
            onChange={handleChange}
            value={state.value}
            {...others}  
        />
    );
}



const validate = (value, now) => {
    let out = '';

    let date = value.replace(/[^0-9]/gi, '');

    let month = date.substr(0, 2);
    if(month.length === 1 && parseInt(month) > 1){
        month = `0${month}`;
    }

    if(parseInt(month) > 12){
        month = '12';
    }

    let year =  date.substr(2, 4);
    if(year.length === 2 && parseInt(year) > 20){
        year = `20${year}`;
    }

    out = month;
    if(year){
        out += ` / ${year}`
    }

    const isComplete = (month.length + year.length) === 6;

    return {
        value: out,
        isComplete,
        isValid: (
            isComplete 
            && 
            (
                parseInt(year) > now.getFullYear() 
                || 
                (
                    parseInt(year) === now.getFullYear() 
                    &&
                    parseInt(month) >= now.getMonth()
                )
            )
        ),
    }
}