import React, { memo } from 'react';
import cn from "classnames";

import Button from '../../../materialPro/components/CustomButtons/Button.jsx';

export function Index(props) {
	const { 
        className, 
        style,
        hour,
        minute,
        meridiem,
        stamp,
        selected,
        forwardRef,
        ...others
    } = props;

    return (
        <Button 
        	className={cn(
        		'time-l2',
                {'selected': selected},
        		className
        	)} 
        	style={{
                ...style 
            }}
            ref={forwardRef}
            {...others}
        >
            <span className="time">
                {hour}:{minute}
            </span>
            <span className="meridiem">
                {meridiem}
            </span>
        </Button>
    );
}

export default memo(Index, (prev, next) =>{
    return (
        prev.time === next.time
        &&
        prev.meridiem === next.meridiem
        &&
        prev.stamp === next.stamp
        &&
        prev.selected === next.selected
    )
})