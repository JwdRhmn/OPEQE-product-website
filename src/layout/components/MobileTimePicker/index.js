import React from 'react';
import cn from "classnames";

import Grid from '@material-ui/core/Grid';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import TimePicker from "../TimePicker";

export default function(props) {
	const { 
        className, 
        style,
        location,
        match,
        history,
        staticContext,
        day,
        month,
        weekDay,
        ...others
    } = props;

    return (
        <Grid 
        	className={cn(
        		'mobile-time-picker-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            container
            justify="center"
        >
            <div className="date">
                <div className="month">
                    {month}
                </div>
                <div className="day">
                    {day}
                </div>
                <div className="week-day">
                    {weekDay}
                </div>
            </div>
            <Grid 
                className="clock"
                container
                item
                alignItems="center"
                justify="center"
            >
                <AccessTimeIcon />
            </Grid>
            <div className="time-container">                
                <TimePicker 
                    {...others}
                    className="time-picker" 
                    from={{
                        hour: 11,
                        minute: 0,
                    }}
                />
            </div>
        </Grid>
    );
}