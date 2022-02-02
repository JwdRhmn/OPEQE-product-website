import React, { useState, useRef, useEffect } from 'react';
import cn from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Grid from "@material-ui/core/Grid";


import RadioButton from '../RadioButton';


export default function(props) {
    const { 
        className, 
        style,
        location,
        match,
        history,
        staticContext,
        items=[],
        breakpoints,
        autoInterval=false,
        buttonsProps={},
        ...others
    } = props;

    const transitionDuration = 1000;

    const [ current, setCurrent ] = useState(0);
    const [ isIncreasing, setIsIncreasing ] = useState(0);

    const intervalRef = useRef(null);

    useEffect(() => {        
        resetInterval();
        return () => killInterval()
    }, []);

    function resetInterval(){
        if(!autoInterval){
            return;
        }
        if(intervalRef.current){
            clearInterval(intervalRef.current);            
        }
        intervalRef.current = setInterval(() => nextSlide(), autoInterval);
    }

    function killInterval(){
        clearInterval(intervalRef.current);
    }

    function handleClick(index){
        setIsIncreasing(index > current);
        setCurrent(index);
        resetInterval();
    }

    function nextSlide(){        
        setIsIncreasing(true);
        setCurrent(
            prevCurrent => (prevCurrent + 1) % itemCount
        );
    }


    const filteredItems = items.length > 6 ? items.slice(0, 6) :  items;
    const itemCount = filteredItems.length;

    if(!itemCount){
        return null;
    }

    return (
        <Grid 
            className={cn(
                'slider-l1',
                className
            )} 
            style={{
                ...style 
            }}
            item
            {...breakpoints}
            {...others}
        >            
            {filteredItems[current] && (
                <TransitionGroup 
                        className={cn(
                            "transition-container",
                            {"exit-left": isIncreasing},
                            {"exit-right": !isIncreasing}
                        )}
                >
                    <CSSTransition
                        classNames="animation"
                        key={current}
                        timeout={{ enter: transitionDuration, exit: transitionDuration }}
                    >
                        {filteredItems[current]}
                    </CSSTransition>
                </TransitionGroup>
            )}
            <div 
                className="slider-buttons"
            >
                    {filteredItems.map(
                        (item, index) => (
                        <RadioButton 
                            key={index}
                            checked={index === current}
                            onClick={() => handleClick(index)} 
                            {...buttonsProps}
                        />
                    )
                )}
            </div>
        </Grid>
    );
}
