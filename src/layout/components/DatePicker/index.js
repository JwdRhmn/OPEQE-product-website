import React, { useState, memo } from 'react';
import cn from "classnames";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import {
    WEEK_DAYS,
    MONTH_NAMES,
    CALENDAR_SYSTEM,
} from '../../config/texts';

import Gregorian from "./components/Gregorian";
import Jalaali from "./components/Jalaali";
import Hijri from "./components/Hijri";

import getDateComponents from "../../../functions/getDateComponents";

export function Calendar({
    events=[],
    className,
    style,
    system=CALENDAR_SYSTEM,
    pickerProps:{
        onChange,
        ...pickerProps
    },
    ...others
}) {

    let DatePicker;
    switch(system){
        case 'GR': {
            DatePicker = Gregorian;
            break;
        }
        case 'JA': {
            DatePicker = Jalaali;
            break;
        }
        case 'HI': {
            DatePicker = Hijri;
            break;
        }
        default: {
            break;
        }
    }

    const [ date, setDate ] = useState();


    function _dateChange(event){
        const selectedDate = event._d ? event._d : event;
        setDate(selectedDate);
        if(onChange){
            onChange(selectedDate);
        }
    }

    const rootProps = {
        className:cn(
            'date-picker-l1',
            className
        ),
        style: {
            ...style 
        },
    };

  return (
    <>
        <div 
            {...rootProps}
            {...others}
        >        
            <DatePicker 
                DialogProps={{
                    ...rootProps,
                }}
                autoOk
                orientation="portrait"
                variant="static"
                openTo="date"
                disablePast
                value={date}                    
                onChange={_dateChange}
                renderDay={renderDay(events)}
                ToolbarComponent={
                    props => <CalendarHeader 
                        {...props} 
                        event={props.date && checkIfContainsDate(events, props.date)} 
                    />
                }
                leftArrowButtonProps={{
                    style: {
                        marginLeft: '10px'
                    }
                }}
                rightArrowButtonProps={{
                    style: {
                        marginRight: '10px'
                    }
                }}
                {...pickerProps}
            />  
        </div>
    </>
  );
}
    

const renderDay = (events) => (day, selectedDate, isInCurrentMonth, dayComponent) => {                                
    const dayUnified = day._d ? day._d : day;
    const selectedDateUnified = selectedDate._d ? selectedDate._d : selectedDate;
    const now = new Date();
    const event = checkIfContainsDate(events, dayUnified);

    const isPast = (now.getMonth() === dayUnified.getMonth()) && (now.getDate() > dayUnified.getDate());                    

    return (
        <Button
            className = {cn(
                'custom-day',
                {'marked': !isPast && isInCurrentMonth && event},
                {'selected': isInCurrentMonth && selectedDateUnified.getTime() === dayUnified.getTime()}
            )}
            disabled = {!isInCurrentMonth || isPast}
            style = {{
                backgroundColor: !isPast && isInCurrentMonth && event && event.bg,
            }}
        >
            {dayUnified.getDate()}
        </Button>
    )
}


const checkIfContainsDate = (array, date) => {
    for(let i = 0; i < array.length; i++){        
        if(
            array[i].day === date.getDate() 
            && 
            array[i].month === (date.getMonth() + 1) 
            &&
            array[i].year === date.getFullYear()
        ){            
            return array[i];
        }
    }

    return null;
}


const CalendarHeader = props => {
    const {
        date,
        event,
    } = props;

    const dayComponents = getDateComponents(date, CALENDAR_SYSTEM, WEEK_DAYS, MONTH_NAMES);
    
    return (
        <Grid 
            className="header"
            container
            justify="space-between"
            alignItems="stretch"
        >
            <div className="preview">
                <span className="pre">
                    {dayComponents.weekDay}
                </span>
                <span className="main">
                    {dayComponents.day}
                </span>
                <br />
                <span className="sub">
                    {dayComponents.monthName}
                </span>                
            </div>
            <div className="details" >                
                <span className="sub">
                    {event && event.title}
                </span>
                <span className="description">
                    {event && event.subTitle}
                </span>
            </div>
        </Grid>
    );
}




export default memo(Calendar, (prev, next) =>{
    return (
        prev.events === next.events
        &&
        prev.system === next.system
        &&
        prev.pickerProps.value.getTime() === next.pickerProps.value.getTime()
    )
})