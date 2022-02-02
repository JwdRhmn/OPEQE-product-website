import React, { useEffect, memo } from 'react';
import cn from "classnames";

import useBreakpoint from "../../hooks/useBreakpoint/";
import useSwipe from "../../hooks/useSwipe/";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";

import { CONFIG_RTL } from "../../config/layout/";

import isMobile from "../../../functions/isMobile";

import compareOwnProps from "../../functions/compareOwnProps";

function Index(props) {
	const { 
        currentFrame=0, 
        frameSize=3,
        children, 
        className, 
        style,
        onNext,
        onPrev,
        hideNext,
        hidePrev,
        ControlIcon=ArrowForwardIos,
        controlPrevProps,
        controlNextProps,
        onFrameCountChange, 
        listContainerProps,     
        skeleton,
        freeScroll,
        onScroll,
    } = props;

    const { handleStart, handleEnd } = useSwipe({
        onDirLeft: !skeleton && onNext, 
        onDirRight: !skeleton && onPrev,
        rtl: CONFIG_RTL,
    });    

    const currentBreakpoint = useBreakpoint();

    useEffect( () => {
        let count;
        if(children && children.length){
            count = children.length;
        } else {
            count = 1;
        }

        if(onFrameCountChange){            
            onFrameCountChange(
                getFrameCount(currentBreakpoint, frameSize, count)
            );
        }
    }, [currentBreakpoint, children && children.length]);


    return (
        <div 
            className={cn(
                "horizontal-scroll-list-l1",
                className,
            )}
            style={{
                ...style,
            }}
            onMouseDown={!freeScroll ? handleStart : null}
            onTouchStart={!freeScroll ? handleStart : null}
            onMouseUp={!freeScroll ? handleEnd : null}
            onTouchEnd={!freeScroll ? handleEnd : null}            
        >
       		<div 
                {...listContainerProps}
                className={cn(
                    "list-container",
                    {"scroll": freeScroll && !skeleton},
                    listContainerProps && listContainerProps.className
                )}
                onScroll={onScroll}
            >
                 <Grid 
                    className={cn(
                        "list-scroller",
                        `take-${frameSize}`,
                    )}
                    container
                    alignItems="stretch"
                    style={{
                        transform: `translateX(${currentFrame * 100 * ((-1) ** !CONFIG_RTL)}%)`,
                    }}
                >                                   
                    {children}
                </Grid>   
            </div>
            {(!skeleton && !isMobile) && (
                <>
                    <div 
                        className={cn(
                            "control-container",
                            "prev",
                        )}
                    >
                        <IconButton 
                            className={cn(
                                "control",
                                {"show": !hidePrev},
                                {"hide": hidePrev},                           
                            )}
                            onClick={onPrev}
                            {...controlPrevProps}                        
                        >
                            <ControlIcon className="icon" />
                        </IconButton>
                    </div>
                    <div 
                        className={cn(
                            "control-container",
                            "next",
                        )}
                    >
                        <IconButton 
                            className={cn(
                                "control",
                                {"show": !hideNext},
                                {"hide": hideNext},                                
                            )}
                            onClick={onNext}
                            {...controlNextProps}                                                        
                        >
                            <ControlIcon className="icon" />
                        </IconButton>
                    </div>
                </>
            )}
        </div>
    );
}



function getFrameCount(breakpoint, frameSize, itemCount){
    let counts = {
        xs: 1,
        sm: 1,
        md: 1,
        lg: frameSize,
        xl: frameSize,
    }

    if(frameSize === 5 || frameSize === 6) {
        counts = {
            ...counts,
            xs: 2,
            sm: 4,
            md: 5,
        }
    }
    if(frameSize === 4) {
        counts = {
            ...counts,
            xs: 1,
            sm: 2,
            md: 3,
        }
    }
    if(frameSize === 3) {
        counts = {
            ...counts,
            xs: 1,
            sm: 2,
            md: 3,
        }
    }
    if(frameSize === 2) {
        counts = {
            ...counts,
            xs: 1,
            sm: 2,
            md: 2,
        }
    }

    return Math.ceil(itemCount / counts[breakpoint]) - 1;

}


export default memo(Index, compareOwnProps(false, ["on"]))