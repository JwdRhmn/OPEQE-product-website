import React, { useState, useEffect } from 'react';
import cn from "classnames";

import Grid from "@material-ui/core/Grid";

import Logo from "../../Logo/";

import getDate from "../../../../functions/formattedDate";

export default function({ 
        className, 
        style,
        estimatedTime=0,
        label,
        ...others
}) {
    
    const [ render, setRender ] = useState(false);

    const { time, postFix } = getArrivalTime(estimatedTime);

    useEffect( () => {
        setTimeout(() => setRender(!render), 60000);
    }, [ render ])

    return (
        <div 
        	className={cn(
        		'header-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <Grid 
                className="header"
                container
                justify="space-between"
                alignItems="center"
            >
                <span className="time">
                    Estimated {label} {time}<i>{postFix}</i>
                </span>
                <Logo width={80} />
            </Grid>
        </div>
    );
}


const getArrivalTime = estimatedTime => {
    const date = new Date();
    date.setMinutes( date.getMinutes() + estimatedTime );
    const arrival = getDate(date);

    return {
        time: `${arrival.hour12}:${arrival.minute}`,
        postFix: arrival.meridiem,
    };
}