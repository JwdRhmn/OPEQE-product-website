import React, { useState, useEffect, useRef, memo } from 'react';
import cn from "classnames";

import ScrollableContainer from "../ScrollableContainer";

import Time from "./components/Time";

import fillZero from "../../../functions/fillZero";

export function TimePicker(props) {
	const { 
        className, 
        style,
        from,
        to,
        onSelect,
        keepSelected,
        interval=60,
        isHorizontal,
        noTimeLabel,
        selected,
        ...others
    } = props;

    const containerRef = useRef(null);
    const selectedRef = useRef(null);
    const [ times, setTimes ] = useState([]);
    

    const selectTime = time => event => {
        if(onSelect){
            onSelect(time);
        }
    }

    useEffect(() => {        
        const newTimes = getTimes(from, to, interval); 
        setTimes( newTimes );
    }, [ from, to, interval ]);

    useEffect(() => {
        if(!selectedRef.current){
            return;
        }
        setScroll(containerRef.current, selectedRef.current, isHorizontal);
    })    

    return (
        <ScrollableContainer 
        	className={cn(
        		'time-picker-l1',
                {'vertical': !isHorizontal},
                {'horizontal': isHorizontal},
        		className
        	)} 
            hidden
            dir='ltr'
        	style={{
                ...style 
            }}
            forwardRef={containerRef}
            {...others}
        >
            {times.length ? times.map(
                time => {
                    const isSelected = selected && time.id === selected.id;
                    return <Time 
                        {...time}
                        key={time.id}                     
                        onClick={selectTime(time)}
                        selected={isSelected}
                        forwardRef={isSelected ? selectedRef : null}
                        hour={time.hour12}
                        minute={time.minute}
                        meridiem={time.meridiem}
                        stamp={time.id}
                    />
                }
            ) : (
                <div className="no-time">
                    {noTimeLabel}
                </div>         
            )}
        </ScrollableContainer>
    );
}


const getTimes = (from, to, interval) => {
    let out = [];    

    const actualTo = to ? to : {
        hour: 23,
        minute: 59,
    }

    const toStamp = (actualTo.hour || 24) * 60 + actualTo.minute;

    let stamp = from.hour * 60 + from.minute;

    const intervalMinutes = interval % 60;
    const intervalHours = parseInt(interval / 60);

    let {
        hour,
        minute,
    } = from;

    let meridiem = hour >= 12 ? "PM" : "AM";

    let hour12;

    while(stamp <= toStamp){    
        // PUSH TIME
        hour12 = (hour > 12) ? hour - 12 : hour;
        hour12 = (hour12 === 0) ? 12 : hour12;
        out.push({
            hour12: fillZero(hour12), 
            hour: hour,
            minute: fillZero(minute),
            meridiem,
            id: `${hour}:${minute}`,
        });
        // ADD INTERVAL
        hour += intervalHours;
        minute += intervalMinutes;
        if(minute > 59){
            minute -= 60;
            hour += 1;
        }
        if(hour > 23){
            hour -= 24;
        }
        if(hour >= 12){
            meridiem = 'PM';
        } else {
            meridiem = 'AM';
        }
        // INCREMENT
        stamp += interval;
    }

    return out;
}

const setScroll = (container, item, isHorizontal) => {
    if(isHorizontal){            
        const scrollLeft = item.offsetLeft 
                         + item.offsetWidth / 2
                         - container.offsetWidth / 2 
                         - container.offsetLeft;
        container.scroll({ left: scrollLeft, behavior: 'smooth' });
    } else {
        const scrollTop = item.offsetTop 
                        + item.offsetHeight / 2
                        - container.offsetHeight / 2 
                        - container.offsetTop;
        container.scroll({ top: scrollTop, behavior: 'smooth' });
    }
}


export default memo(TimePicker, (prev, next) =>{

    return prev.interval === next.interval
           &&
           prev.roundTo === next.roundTo
           &&
           prev.to === next.to
           &&
           prev.from.minute === next.from.minute
           &&
           prev.from.hour === next.from.hour
           &&
           prev.selected === next.selected
})